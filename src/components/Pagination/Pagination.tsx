import { Accessor, Component, For, Show } from "solid-js";
import { Button } from "../Button";
import ChevronLeft from "lucide-solid/icons/chevron-left";
import ChevronRight from "lucide-solid/icons/chevron-right";
import ChevronDown from "lucide-solid/icons/chevron-down";
import { tv } from "tailwind-variants";

import { iconSize } from "../../constants";
import { DropdownMenu } from "../DropdownMenu";
import { NumberInput } from "../NumberInput";

interface PaginationProps {
  perPage: Accessor<number>;
  perPageOptions: number[];
  page: Accessor<number>;
  totalItems: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  class?: string;
}

const base = tv({
  base: "flex items-center gap-2",
});

const labelClass = tv({
  base: "min-w-30 text-end",
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-xs",
      md: "text-sm",
      lg: "text-sm",
      xl: "text-md",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

export const Pagination: Component<PaginationProps> = (props) => {
  const from = () => Math.max(0, props.page() * props.perPage()) + 1;
  const to = () => Math.min(props.totalItems, (props.page() + 1) * props.perPage());
  const totalPages = () => Math.ceil(props.totalItems / props.perPage());
  const isFirstPage = () => props.page() === 0;
  const isLastPage = () => props.page() >= totalPages() - 1;

  return (
    <div class={base({ class: props.class })}>
      <Show when={props.totalItems > 0}>
        <p class={labelClass({ size: props.size })}>
          Results: {from()}-{to()} of {props.totalItems}
        </p>
      </Show>
      <DropdownMenu>
        <DropdownMenu.Trigger>
          <Button size={props.size} class="min-w-25">
            <div class="flex items-center gap-1">
              <span>{props.perPage()} / page </span>
              <ChevronDown size={iconSize[props.size ?? "md"]} />
            </div>
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content size={props.size}>
          <For each={props.perPageOptions}>
            {(opt) => (
              <DropdownMenu.MenuItem onSelect={() => props.onPerPageChange(opt)}>
                <a>{opt}</a>
              </DropdownMenu.MenuItem>
            )}
          </For>
        </DropdownMenu.Content>
      </DropdownMenu>
      <div class="join">
        <Button
          class="join-item"
          size={props.size}
          modifier="square"
          disabled={isFirstPage()}
          onClick={props.onPrevPage}
        >
          <ChevronLeft size={iconSize[props.size ?? "md"]} />
        </Button>
        <NumberInput
          class="join-item"
          inputProps={{ class: "rounded-none w-15 text-center" }}
          size={props.size}
          minValue={1}
          maxValue={totalPages()}
          rawValue={props.page() + 1}
          onRawValueChange={(val) => props.onPageChange(val - 1)}
        />
        <Button
          class="join-item"
          size={props.size}
          modifier="square"
          disabled={isLastPage()}
          onClick={props.onNextPage}
        >
          <ChevronRight size={iconSize[props.size ?? "md"]} />
        </Button>
      </div>
    </div>
  );
};
