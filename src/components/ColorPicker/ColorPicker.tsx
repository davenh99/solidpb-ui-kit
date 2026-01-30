import { Show, createSignal } from "solid-js";
import { tv } from "tailwind-variants";

interface ColorPickerProps {
  value?: string;
  onChange?: (color: string) => void;
  saveFunc?: (v: string) => Promise<void>;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  label?: string;
  class?: string;
}

const colorPicker = tv({
  base: "flex items-center justify-center w-10 h-10 cursor-pointer rounded-lg focus:outline-2",
  variants: {
    size: {
      xs: "w-6 h-6",
      sm: "w-8 h-8",
      md: "w-10 h-10",
      lg: "w-12 h-12",
      xl: "w-16 h-16",
    },
  },
});

const label = tv({
  base: "label",
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-xs",
      md: "text-xs",
      lg: "text-sm",
      xl: "text-sm",
    },
  },
});

export function ColorPicker(props: ColorPickerProps) {
  let inputRef: HTMLInputElement | undefined;
  let swatchRef: HTMLDivElement | undefined;
  const [color, setColor] = createSignal(props.value ?? "#000000");

  // Sync external value changes
  if (props.value !== undefined && props.value !== color()) {
    setColor(props.value);
  }

  const handleChange = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    setColor(value);
    props.onChange?.(value);
    props.saveFunc?.(value);
  };

  const handleDivClick = () => {
    inputRef?.click();
  };

  return (
    <label class="flex flex-col gap-1 w-fit">
      <Show when={props.label}>
        <span class={label({ size: props.size })}>{props.label}</span>
      </Show>
      <div
        ref={(el) => (swatchRef = el)}
        class={colorPicker({ size: props.size, class: props.class })}
        style={{ background: color() }}
        aria-label="Color picker"
        tabIndex={0}
        role="button"
        onClick={handleDivClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleDivClick();
        }}
      ></div>
      <input
        ref={(el) => (inputRef = el)}
        type="color"
        value={color()}
        onInput={handleChange}
        style={{ position: "absolute", opacity: 0, width: "1px", height: "1px", "pointer-events": "none" }}
        tabIndex={-1}
        aria-hidden="true"
        onfocus={() => swatchRef?.focus()}
      />
    </label>
  );
}

export default ColorPicker;
