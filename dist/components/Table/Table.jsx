import { For, Show, createEffect, createMemo, createSignal, onCleanup } from "solid-js";
import { attachClosestEdge, extractClosestEdge, } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { draggable, dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import invariant from "tiny-invariant";
import { createSolidTable, flexRender, getCoreRowModel } from "@tanstack/solid-table";
import { tv } from "tailwind-variants";
import Loader from "lucide-solid/icons/loader";
import GripVertical from "lucide-solid/icons/grip-vertical";
import { triggerFlash } from "../../methods/triggerFlash";
import { iconSize } from "../../constants";
const tableClass = tv({
    base: "table table-pin-rows",
    variants: {
        size: {
            xs: "table-xs",
            sm: "table-sm",
            md: "table-md",
            lg: "table-lg",
            xl: "table-xl",
        },
    },
    defaultVariants: {
        size: "sm",
    },
});
const TableRow = (props) => {
    let ref;
    let handleRef;
    const [dragging, setDragging] = createSignal("idle");
    const [closestEdge, setClosestEdge] = createSignal();
    createEffect(() => {
        if (props.flashSignal?.() === props.row.original.id && ref) {
            triggerFlash(ref);
        }
    });
    createEffect(() => {
        if (!props.dragEnabled())
            return;
        const element = ref;
        invariant(element);
        const dispose = dropTargetForElements({
            element,
            canDrop({ source }) {
                // not allowing dropping on yourself
                if (source.element === element) {
                    return false;
                }
                // only allowing same collection for now to be dropped on me
                return source.data.collectionId == props.row.original.collectionId;
            },
            getData({ input }) {
                return attachClosestEdge({ id: props.row.original.id, ind: props.row.index, collectionId: props.row.original.collectionId }, { element, input, allowedEdges: ["top", "bottom"] });
            },
            onDragEnter({ self }) {
                const _closestEdge = extractClosestEdge(self.data);
                setDragging("dragging-over");
                setClosestEdge(_closestEdge);
            },
            onDrag({ self }) {
                const _closestEdge = extractClosestEdge(self.data);
                // Only need to update state if nothing has changed.
                if (dragging() !== "dragging-over" || _closestEdge !== closestEdge()) {
                    setDragging("dragging-over");
                    setClosestEdge(_closestEdge);
                }
            },
            onDragLeave() {
                setDragging("idle");
            },
            onDrop() {
                setDragging("idle");
            },
        });
        onCleanup(dispose);
    });
    createEffect(() => {
        if (!props.dragEnabled())
            return;
        const element = ref;
        const elementHandle = handleRef;
        invariant(element);
        invariant(elementHandle);
        const dispose = draggable({
            element,
            dragHandle: elementHandle,
            getInitialData() {
                return {
                    id: props.row.original.id,
                    ind: props.row.index,
                    collectionId: props.row.original.collectionId,
                };
            },
            onDragStart() {
                setDragging("dragging");
            },
            onDrop() {
                setDragging("idle");
            },
        });
        onCleanup(dispose);
    });
    return (<tr ref={ref} data-drop-edge={dragging() === "dragging-over" ? (closestEdge() ?? undefined) : undefined} class="row-hover relative" style={{ opacity: dragging() == "dragging" ? 0.2 : 1 }} onClick={() => props.onRowClick(props.row.original)}>
      <Show when={props.row.original.tablePosition !== undefined}>
        <th ref={handleRef} class="cursor-pointer">
          <GripVertical size={iconSize[props.size ?? "md"]}/>
        </th>
      </Show>
      <For each={props.row.getVisibleCells()}>
        {(cell) => <td>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>}
      </For>
    </tr>);
};
export const Table = (props) => {
    const table = createSolidTable({
        get data() {
            return props.data || [];
        },
        columns: props.columns,
        getCoreRowModel: getCoreRowModel(),
    });
    const rowCount = createMemo(() => table.getRowModel().rows.length);
    const rows = createMemo(() => table.getRowModel().rows);
    const dragEnabled = createMemo(() => {
        return props.data.length > 0 && "tablePosition" in props.data[0];
    });
    const [flashedRowId, setFlashedRowId] = createSignal(null);
    createEffect(() => {
        if (!rows().length || !dragEnabled())
            return;
        const dispose = monitorForElements({
            canMonitor({ source }) {
                return source.data.collectionId == props.data[0].collectionId;
            },
            onDrop({ location, source }) {
                const target = location.current.dropTargets[0];
                if (!target) {
                    return;
                }
                const sourceData = source.data;
                const targetData = target.data;
                if (sourceData.collectionId !== targetData.collectionId) {
                    return;
                }
                if (sourceData.ind < 0 || targetData.ind < 0) {
                    return;
                }
                const closestEdgeOfTarget = extractClosestEdge(targetData);
                let newInd = closestEdgeOfTarget === "top" ? targetData.ind : targetData.ind + 1;
                if (newInd > sourceData.ind) {
                    newInd--;
                }
                if (sourceData.ind !== newInd) {
                    setFlashedRowId(sourceData.id);
                    setTimeout(() => setFlashedRowId(null), 10);
                }
                props.onReorderRow?.(props.data[sourceData.ind], sourceData.ind, newInd);
            },
        });
        onCleanup(dispose);
    });
    return (<div class="overflow-x-auto">
      <Show when={!props.loading} fallback={props.loadingFallback || (<div class="fixed inset-0 z-10 flex items-center justify-center">
              <Loader class="w-9 h-9 animate-spin"/>
            </div>)}>
        <Show when={rowCount() > 0} fallback={props.emptyState || <div class="text-center py-4">No results found.</div>}>
          <table class={tableClass({ class: props.class })}>
            <Show when={props.headers}>
              <thead>
                <For each={table.getHeaderGroups()}>
                  {(headerGroup) => (<tr>
                      <Show when={dragEnabled()}>
                        <th></th>
                      </Show>
                      <For each={headerGroup.headers}>
                        {(header) => (<th>{flexRender(header.column.columnDef.header, header.getContext())}</th>)}
                      </For>
                    </tr>)}
                </For>
              </thead>
            </Show>

            <tbody>
              <For each={rows()}>
                {(row, ind) => (<TableRow row={row} ind={ind()} onRowClick={() => props.onRowClick?.(row.original)} dragEnabled={dragEnabled} flashSignal={() => flashedRowId()}/>)}
              </For>
            </tbody>
          </table>
        </Show>
      </Show>
    </div>);
};
export default Table;
