import { Combobox } from "@kobalte/core/combobox";
import Check from "lucide-solid/icons/check";
import Down from "lucide-solid/icons/chevron-down";
import { For, JSXElement, Show } from "solid-js";
import { tv } from "tailwind-variants";
import { Tag } from "./Tag";

export interface RelationPickerProps<T> {
  value: T | T[] | null;
  options: T[];
  onChange: (val: T | T[] | null) => void;
  labelKey: keyof T;
  valueKey: keyof T;
  disabledKey?: keyof T;
  multi?: boolean;
  label?: string;
  variant?: "ghost";
  appearance?: "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  disabled?: boolean;
  placeholder?: string;
  class?: string;
  listboxAction?: JSXElement;
  onTextInputChange?: (text: string) => void;
  defaultFilter?: (option: T[] | Exclude<NonNullable<T>, null>, filter: string) => boolean;
}

const input = tv({
  base: "input outline-offset-0 max-w-[20rem]",
  variants: {
    variant: {
      ghost: "input-ghost",
      none: "",
    },
    appearance: {
      neutral: "input-neutral",
      primary: "input-primary",
      secondary: "input-secondary",
      accent: "input-accent",
      info: "input-info",
      success: "input-success",
      warning: "input-warning",
      error: "input-error",
    },
    size: {
      xs: "input-xs",
      sm: "input-sm",
      md: "input-md",
      lg: "input-lg",
      xl: "input-xl",
    },
    tags: {
      true: "h-full py-1.25",
      false: "",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

const menu = tv({
  base: "menu w-full",
  variants: {
    size: {
      xs: "menu-xs",
      sm: "menu-sm",
      md: "menu-base",
      lg: "menu-lg",
      xl: "menu-xl",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

export const RelationPicker = <T,>(props: RelationPickerProps<T>) => {
  let inputRef!: HTMLInputElement;
  const values = () => {
    if (props.multi) {
      return Array.isArray(props.value) ? props.value : props.value ? [props.value] : [];
    } else {
      return props.value && !Array.isArray(props.value) ? props.value : null;
    }
  };

  return (
    <div class="floating-label">
      {props.label && <span>{props.label}</span>}
      <Combobox
        disabled={props.disabled}
        multiple={props.multi}
        value={values()}
        onChange={props.onChange}
        options={props.options}
        //@ts-ignore, kobalte confusing, just ignore for now...
        optionValue={props.valueKey}
        //@ts-ignore
        optionTextValue={props.labelKey}
        //@ts-ignore
        optionLabel={props.labelKey}
        //@ts-ignore
        optionDisabled={props.disabledKey}
        placeholder={props.placeholder}
        onMouseDown={(e) => {
          e.preventDefault();
          inputRef?.focus();
        }}
        defaultFilter={props.defaultFilter}
        itemComponent={(itemProps) => (
          <Combobox.Item item={itemProps.item} class="outline-none focus:bg-base-300 rounded-sm">
            <Combobox.ItemLabel class="flex flex-row justify-between items-center">
              {itemProps.item.textValue}
              <Combobox.ItemIndicator>
                <Check size={16} />
              </Combobox.ItemIndicator>
            </Combobox.ItemLabel>
          </Combobox.Item>
        )}
      >
        <Combobox.Control<T>
          class={input({
            variant: props.variant,
            appearance: props.appearance,
            size: props.size,
            class: props.class,
            tags: props.multi && Array.isArray(props.value) && props.value.length > 0,
          })}
        >
          {(state) => (
            <>
              <Show
                when={props.multi}
                fallback={
                  <Combobox.Input
                    onBlur={(e) => {
                      if (!props.value) {
                        e.currentTarget.value = "";
                      } else {
                        e.currentTarget.value = String(state.selectedOptions()[0][props.labelKey]);
                      }
                    }}
                    ref={inputRef}
                    onInput={(e) => props.onTextInputChange?.(e.currentTarget.value)}
                  />
                }
              >
                <div class="flex flex-wrap gap-1 w-full">
                  <For each={state.selectedOptions()}>
                    {(option) => (
                      <span onPointerDown={(e) => e.stopPropagation()}>
                        <Tag
                          appearance="neutral"
                          variant="soft"
                          title={String(option[props.labelKey])}
                          onDelete={() => state.remove(option)}
                        />
                      </span>
                    )}
                  </For>
                  <Combobox.Input
                    class="w-[unset]"
                    onBlur={(e) => (e.currentTarget.value = "")}
                    ref={inputRef}
                    onInput={(e) => props.onTextInputChange?.(e.currentTarget.value)}
                  />
                </div>
              </Show>
              <Combobox.Trigger>
                <Combobox.Icon>
                  <Down size={16} />
                </Combobox.Icon>
              </Combobox.Trigger>
            </>
          )}
        </Combobox.Control>
        <Combobox.Portal>
          <Combobox.Content class="rounded-box bg-base-100 shadow-md border border-base-200 z-20 max-h-100 overflow-auto">
            <Combobox.Listbox class={menu({ size: props.size })} />
            {props.listboxAction}
          </Combobox.Content>
        </Combobox.Portal>
      </Combobox>
    </div>
  );
};

export default RelationPicker;
