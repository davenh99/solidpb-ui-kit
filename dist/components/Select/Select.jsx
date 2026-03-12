import { Select as KSelect } from "@kobalte/core/select";
import Check from "lucide-solid/icons/check";
import UpDown from "lucide-solid/icons/chevrons-up-down";
import { tv } from "tailwind-variants";
import { Button } from "../Button";
import { iconSize } from "../../constants";
const trigger = tv({
    base: "input outline-offset-0 flex justify-between items-center join-item",
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
export const Select = (props) => {
    return (<label class="floating-label">
      {props.label && <span>{props.label}</span>}
      <KSelect disabled={props.disabled} multiple={false} value={props.value} onChange={props.onChange} options={props.options} optionValue={props.valueKey} optionTextValue={props.labelKey} optionDisabled={props.disabledKey} placeholder={props.placeholder} itemComponent={(itemProps) => {
            return (<KSelect.Item item={itemProps.item} class="outline-none focus:bg-base-300 rounded-sm">
              <KSelect.ItemLabel class="flex flex-row justify-between items-center">
                {props.labelKey ? String(itemProps.item.rawValue[props.labelKey]) : itemProps.item.textValue}
                <KSelect.ItemIndicator>
                  <Check size={16}/>
                </KSelect.ItemIndicator>
              </KSelect.ItemLabel>
            </KSelect.Item>);
        }}>
        <KSelect.Trigger class="join w-full max-w-[20rem]">
          <div class={trigger({
            variant: props.variant,
            appearance: props.appearance,
            size: props.size,
            class: props.class,
        })}>
            <KSelect.Value>
              {(state) => String(props.labelKey ? state.selectedOption()?.[props.labelKey] : "")}
            </KSelect.Value>
          </div>
          <KSelect.Icon as={Button} class="join-item" modifier="square" size={props.size}>
            <UpDown size={iconSize[props.size ?? "sm"]}/>
          </KSelect.Icon>
        </KSelect.Trigger>
        <KSelect.Portal>
          <KSelect.Content class="rounded-box bg-base-100 shadow-md border border-base-200 z-20 max-h-100 overflow-auto">
            <KSelect.Listbox class={menu({ size: props.size })}/>
          </KSelect.Content>
        </KSelect.Portal>
      </KSelect>
    </label>);
};
export default Select;
