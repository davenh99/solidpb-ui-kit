import { Component } from "solid-js";
import { Select as KobalteSelect } from "@kobalte/core/select";
import Check from "lucide-solid/icons/check";
import UpDown from "lucide-solid/icons/chevrons-up-down";

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  label?: string;
  options: Option[];
  value: string;
  onChange: (value: string | null) => void;
  placeholder?: string;
  class?: string;
}

export const Select: Component<SelectProps> = (props) => {
  return (
    <div class={props.class}>
      {props.label && (
        <label class="block mb-1 text-xs font-medium text-[var(--color-text-light-secondary)] dark:text-[var(--color-text-dark-secondary)]">
          {props.label}
        </label>
      )}
      <KobalteSelect
        multiple={false}
        value={props.value}
        onChange={props.onChange}
        options={props.options.map((o) => o.value)}
        placeholder={props.placeholder}
        itemComponent={(itemProps) => {
          const option = props.options.find((o) => o.value === itemProps.item.rawValue);
          return (
            <KobalteSelect.Item
              item={itemProps.item}
              class="flex flex-row space-x-1 px-2 py-1 hover:bg-[var(--color-light-muted)] dark:hover:bg-[var(--color-dark-muted)] rounded cursor-pointer"
            >
              <KobalteSelect.ItemLabel>{option?.label ?? itemProps.item.textValue}</KobalteSelect.ItemLabel>
              <KobalteSelect.ItemIndicator>
                <Check size={16} />
              </KobalteSelect.ItemIndicator>
            </KobalteSelect.Item>
          );
        }}
      >
        <KobalteSelect.Trigger class="rounded border px-3 py-1 bg-[var(--color-light-surface)] dark:bg-[var(--color-dark-surface)] flex flex-row items-center justify-between w-full text-[var(--color-text-light-primary)] dark:text-[var(--color-text-dark-primary)]">
          <KobalteSelect.Value<string>>
            {(state) => {
              const selected = props.options.find((o) => o.value === state.selectedOption());
              return selected ? selected.label : props.placeholder || "Select...";
            }}
          </KobalteSelect.Value>
          <KobalteSelect.Icon>
            <UpDown size={16} />
          </KobalteSelect.Icon>
        </KobalteSelect.Trigger>
        <KobalteSelect.Portal>
          <KobalteSelect.Content class="rounded border bg-[var(--color-light-surface)] dark:bg-[var(--color-dark-surface)] text-[var(--color-text-light-primary)] dark:text-[var(--color-text-dark-primary)] shadow-lg mt-1">
            <KobalteSelect.Listbox class="max-h-50 overflow-y-auto" />
          </KobalteSelect.Content>
        </KobalteSelect.Portal>
      </KobalteSelect>
    </div>
  );
};

export default Select;
