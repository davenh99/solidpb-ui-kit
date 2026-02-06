import { For, JSXElement } from "solid-js";
import { tv } from "tailwind-variants";

export interface KanbanItem {
  id: string | number;
  title: string;
  description?: string;
  status: string;
  [key: string]: any;
}

export interface KanbanColumn {
  id: string;
  title: string;
  description?: string;
}

export interface KanbanProps<T extends KanbanItem> {
  items: T[];
  columns: KanbanColumn[];
  renderItem?: (item: T) => JSXElement;
  onCardClick?: (item: T) => void;
  containerClass?: string;
  columnClass?: string;
  cardClass?: string;
}

const container = tv({
  base: "flex gap-6 overflow-x-auto rounded-lg min-h-96",
});

const column = tv({
  base: "flex flex-col gap-3 min-w-80 flex-shrink-0",
});

const columnHeader = tv({
  base: "font-semibold text-sm text-base-content sticky top-0 pb-2",
});

const columnContent = tv({
  base: "flex flex-col gap-3",
});

const itemCard = tv({
  base: "bg-base-100 p-3 rounded-md cursor-pointer hover:shadow-md transition-shadow",
});

const itemTitle = tv({
  base: "font-medium text-sm text-base-content",
});

const itemDescription = tv({
  base: "text-xs text-base-content/60 mt-1",
});

export const Kanban = <T extends KanbanItem>(props: KanbanProps<T>) => {
  const getItemsByStatus = (status: string) => {
    return props.items.filter((item) => item.status === status);
  };

  return (
    <div class={container({ class: props.containerClass })}>
      <For each={props.columns}>
        {(col) => (
          <div class={column({ class: props.columnClass })}>
            <div>
              <div class={columnHeader()}>{col.title}</div>
              <div class="text-xs text-base-content/50">{getItemsByStatus(col.id).length} items</div>
            </div>
            <div class={columnContent()}>
              <For each={getItemsByStatus(col.id)}>
                {(item) => (
                  <div class={itemCard({ class: props.cardClass })} onClick={() => props.onCardClick?.(item)}>
                    {props.renderItem ? (
                      props.renderItem(item)
                    ) : (
                      <>
                        <div class={itemTitle()}>{item.title}</div>
                        {item.description && <div class={itemDescription()}>{item.description}</div>}
                      </>
                    )}
                  </div>
                )}
              </For>
            </div>
          </div>
        )}
      </For>
    </div>
  );
};

export default Kanban;
