import { Component } from "solid-js";
import { Select as KobalteSelect } from "@kobalte/core/select";
import Check from "lucide-solid/icons/check";
import Down from "lucide-solid/icons/chevron-down";
import { tv } from "tailwind-variants";

interface Option {
  label: string;
  value: string;
}

export interface SelectProps {
  label?: string;
  options: Option[];
  value?: string;
  onChange: (value: string | null) => void;
  placeholder?: string;
  class?: string;
}

const base = tv({
  base: "floating-label",
});

export const Select: Component<SelectProps> = (props) => {
  return (
    <label class={base({ class: props.class })}>
      {props.label && <span>{props.label}</span>}
      <KobalteSelect
        multiple={false}
        value={props.value}
        onChange={props.onChange}
        options={props.options.map((o) => o.value)}
        placeholder={props.placeholder}
        itemComponent={(itemProps) => {
          const option = props.options.find((o) => o.value === itemProps.item.rawValue);
          return (
            <KobalteSelect.Item item={itemProps.item}>
              <KobalteSelect.ItemLabel class="flex flex-row justify-between items-center">
                {option?.label ?? itemProps.item.textValue}
                <KobalteSelect.ItemIndicator>
                  <Check size={16} />
                </KobalteSelect.ItemIndicator>
              </KobalteSelect.ItemLabel>
            </KobalteSelect.Item>
          );
        }}
      >
        <KobalteSelect.Trigger class="input outline-offset-0 flex justify-between items-center">
          <KobalteSelect.Value<string>>
            {(state) => {
              const selected = props.options.find((o) => o.value === state.selectedOption());
              return selected ? selected.label : props.placeholder || "Select...";
            }}
          </KobalteSelect.Value>
          <KobalteSelect.Icon>
            <Down size={16} />
          </KobalteSelect.Icon>
        </KobalteSelect.Trigger>
        <KobalteSelect.Portal>
          <KobalteSelect.Content class="rounded-box bg-base-200 shadow-md z-50">
            <KobalteSelect.Listbox class="menu w-full" />
          </KobalteSelect.Content>
        </KobalteSelect.Portal>
      </KobalteSelect>
    </label>
  );
};

export default Select;
