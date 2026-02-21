import { Select as KSelect } from "@kobalte/core/select";
import Check from "lucide-solid/icons/check";
import Down from "lucide-solid/icons/chevron-down";
import { tv } from "tailwind-variants";

export interface SelectProps<T> {
  options: T[];
  value: T | null;
  onChange: (val: T | null) => void;
  labelKey?: keyof T;
  valueKey?: keyof T;
  disabledKey?: keyof T;
  label?: string;
  variant?: "ghost";
  appearance?: "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  class?: string;
  placeholder?: string;
  disabled?: boolean;
}

const trigger = tv({
  base: "input outline-offset-0 flex justify-between items-center",
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

export const Select = <T,>(props: SelectProps<T>) => {
  return (
    <label class="floating-label">
      {props.label && <span>{props.label}</span>}
      <KSelect
        disabled={props.disabled}
        multiple={false}
        value={props.value}
        onChange={props.onChange}
        options={props.options}
        optionValue={props.valueKey}
        optionTextValue={props.labelKey}
        optionDisabled={props.disabledKey}
        placeholder={props.placeholder}
        itemComponent={(itemProps) => {
          return (
            <KSelect.Item item={itemProps.item} class="outline-none">
              <KSelect.ItemLabel class="flex flex-row justify-between items-center">
                {props.labelKey ? String(itemProps.item.rawValue[props.labelKey]) : itemProps.item.textValue}
                <KSelect.ItemIndicator>
                  <Check size={16} />
                </KSelect.ItemIndicator>
              </KSelect.ItemLabel>
            </KSelect.Item>
          );
        }}
      >
        <KSelect.Trigger
          class={trigger({
            variant: props.variant,
            appearance: props.appearance,
            size: props.size,
            class: props.class,
          })}
        >
          <KSelect.Value<T>>
            {(state) => String(props.labelKey ? state.selectedOption()?.[props.labelKey] : "")}
          </KSelect.Value>
          <KSelect.Icon>
            <Down size={16} />
          </KSelect.Icon>
        </KSelect.Trigger>
        <KSelect.Portal>
          <KSelect.Content class="rounded-box bg-base-100 shadow-md z-50">
            <KSelect.Listbox class={menu({ size: props.size })} />
          </KSelect.Content>
        </KSelect.Portal>
      </KSelect>
    </label>
  );
};

export default Select;
