import { createSignal } from "solid-js";

interface ColorPickerProps {
  value?: string;
  onChange?: (color: string) => void;
}

export function ColorPicker(props: ColorPickerProps) {
  const [color, setColor] = createSignal(props.value || "#000000");

  const handleChange = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    setColor(value);
    props.onChange?.(value);
  };

  return (
    <input
      type="color"
      value={color()}
      onInput={handleChange}
      aria-label="Color picker"
      style={{ width: "2.5rem", height: "2.5rem", border: "none", background: "none", cursor: "pointer" }}
    />
  );
}

export default ColorPicker;
