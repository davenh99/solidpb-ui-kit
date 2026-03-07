import { Show, createSignal } from "solid-js";
import type { Component, JSX } from "solid-js";
import { tv } from "tailwind-variants";
import Pencil from "lucide-solid/icons/pencil";
import ImageIcon from "lucide-solid/icons/image";

import { Button } from "../Button";

export interface ImageProps extends Omit<JSX.ImgHTMLAttributes<HTMLImageElement>, "onChange"> {
  editable?: boolean;
  onChange?: (file: File) => void;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  label?: string;
}

const image = tv({
  base: "rounded-box shadow object-cover",
  variants: {
    size: {
      xs: "w-16 h-16",
      sm: "w-24 h-24",
      md: "w-32 h-32",
      lg: "w-48 h-48",
      xl: "w-64 h-64",
    },
  },
});

const placeholder = tv({
  base: "rounded-box shadow flex items-center justify-center bg-base-200",
  variants: {
    size: {
      xs: "w-16 h-16",
      sm: "w-24 h-24",
      md: "w-32 h-32",
      lg: "w-48 h-48",
      xl: "w-64 h-64",
    },
  },
});

const label = tv({
  base: "label text-xs",
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-xs",
      md: "text-xs",
      lg: "text-sm",
      xl: "text-sm",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

export const Image: Component<ImageProps> = (props) => {
  const [preview, setPreview] = createSignal<string | null>(null);
  let fileInputRef: HTMLInputElement | null = null;

  const handleEditClick = () => {
    fileInputRef?.click();
  };

  const handleFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      props.onChange?.(file);
    }
  };

  // Destructure onChange and editable so they are not passed to <img>
  const { onChange, editable, ...imgProps } = props;
  const currentSrc = () => preview() || props.src;

  return (
    <label class="flex flex-col gap-1 w-fit">
      <Show when={props.label}>
        <span class={label({ size: props.size })}>{props.label}</span>
      </Show>
      <div class="relative inline-block group w-fit">
        <Show
          when={currentSrc()}
          fallback={
            <div class={placeholder({ size: props.size, class: props.class })}>
              <ImageIcon class="w-1/2 h-1/2 text-base-300" />
            </div>
          }
        >
          <img
            {...imgProps}
            src={currentSrc()}
            alt={props.alt}
            class={image({ size: props.size, class: props.class })}
          />
        </Show>
        <Show when={editable}>
          <div class="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 rounded-box">
            <Button size="sm" modifier="square" variant="ghost" onClick={handleEditClick}>
              <Pencil class="w-4 h-4" />
            </Button>
          </div>
          <input
            ref={(el) => (fileInputRef = el)}
            type="file"
            accept="image/*"
            class="hidden"
            onChange={handleFileChange}
          />
        </Show>
      </div>
    </label>
  );
};
