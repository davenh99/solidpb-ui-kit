import { Combobox } from "@kobalte/core/combobox";
import Check from "lucide-solid/icons/check";
import Link from "lucide-solid/icons/link";
import UpDown from "lucide-solid/icons/chevrons-up-down";
import { For, Show } from "solid-js";
import { tv } from "tailwind-variants";
import { Tag } from "./Tag";
import { Button } from "./Button";
import { iconSize } from "../constants";
const input = tv({
    base: "join-item input outline-offset-0",
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
export const RelationPicker = (props) => {
    let inputRef;
    const values = () => {
        if (props.multi) {
            return Array.isArray(props.value) ? props.value : props.value ? [props.value] : [];
        }
        else {
            return props.value && !Array.isArray(props.value) ? props.value : null;
        }
    };
    const options = () => {
        if (props.options.length === 0)
            return [
                { [props.labelKey]: "No Records Found", [props.valueKey]: "__no_options__", disabled: true },
            ];
        return props.options;
    };
    return (<div class="floating-label">
      {props.label && <span>{props.label}</span>}
      <Combobox disabled={props.disabled} multiple={props.multi} value={values()} onChange={props.onChange} options={options()} 
    //@ts-ignore, kobalte confusing, just ignore for now...
    optionValue={props.valueKey} 
    //@ts-ignore
    optionTextValue={props.labelKey} 
    //@ts-ignore
    optionLabel={props.labelKey} 
    //@ts-ignore
    optionDisabled={props.disabledKey} placeholder={props.placeholder} onMouseDown={(e) => {
            e.preventDefault();
            inputRef?.focus();
        }} defaultFilter={props.defaultFilter} itemComponent={(itemProps) => (<Combobox.Item item={itemProps.item} class="outline-none focus:bg-base-300 rounded-sm">
            <Combobox.ItemLabel class="flex flex-row justify-between items-center">
              {itemProps.item.textValue}
              <Combobox.ItemIndicator>
                <Check size={16}/>
              </Combobox.ItemIndicator>
            </Combobox.ItemLabel>
          </Combobox.Item>)}>
        <Combobox.Control class="join w-full max-w-[20rem]">
          {(state) => (<>
              <div class={input({
                variant: props.variant,
                appearance: props.appearance,
                size: props.size,
                class: props.class,
                tags: props.multi && Array.isArray(props.value) && props.value.length > 0,
            })}>
                <Show when={props.multi} fallback={<>
                      {!props.multi && values() && (props.href || props.onLinkClick) && (<a class="btn btn-ghost btn-primary btn-xs btn-square" href={props.href} onClick={() => props.onLinkClick?.(props.value)}>
                          <Link class="w-[1em] h-[1em]"/>
                        </a>)}
                      <Combobox.Input onBlur={(e) => {
                    if (!props.value) {
                        e.currentTarget.value = "";
                    }
                    else {
                        e.currentTarget.value = String(state.selectedOptions()[0][props.labelKey]);
                    }
                }} ref={inputRef} onInput={(e) => props.onTextInputChange?.(e.currentTarget.value)}/>
                    </>}>
                  <div class="flex flex-wrap gap-1 w-full">
                    <For each={state.selectedOptions()}>
                      {(option) => (<span onPointerDown={(e) => e.stopPropagation()}>
                          <Tag appearance="neutral" variant="soft" title={String(option[props.labelKey])} onDelete={() => state.remove(option)}/>
                        </span>)}
                    </For>
                    <Combobox.Input class="w-[unset]" onBlur={(e) => (e.currentTarget.value = "")} ref={inputRef} onInput={(e) => props.onTextInputChange?.(e.currentTarget.value)}/>
                  </div>
                </Show>
              </div>
              <Combobox.Trigger as={Button} size={props.size} modifier="square" class="join-item">
                <Combobox.Icon>
                  <UpDown size={iconSize[props.size ?? "sm"]}/>
                </Combobox.Icon>
              </Combobox.Trigger>
            </>)}
        </Combobox.Control>
        <Combobox.Portal>
          <Combobox.Content class="rounded-box bg-base-100 shadow-md border border-base-200 z-20 max-h-100 overflow-auto">
            <Combobox.Listbox class={menu({ size: props.size })}/>
            {props.listboxAction}
          </Combobox.Content>
        </Combobox.Portal>
      </Combobox>
    </div>);
};
export default RelationPicker;
