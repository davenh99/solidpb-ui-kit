import { Component } from "solid-js";
import { Button as KobalteButton } from "@kobalte/core/button";
import CloseIcon from "lucide-solid/icons/x";
import { tv } from "tailwind-variants";

export interface TagProps {
  title: string;
  colorHex?: string;
  onDelete?: () => void;
  variant?: "ghost" | "outline" | "dash" | "soft";
  appearance?: "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  class?: string;
}

const tag = tv({
  base: "badge rounded-full",
  variants: {
    size: {
      xs: "badge-xs",
      sm: "badge-sm",
      md: "badge-md",
      lg: "badge-lg",
      xl: "badge-xl",
    },
    appearance: {
      neutral: "badge-neutral",
      primary: "badge-primary",
      secondary: "badge-secondary",
      accent: "badge-accent",
      info: "badge-info",
      success: "badge-success",
      warning: "badge-warning",
      error: "badge-error",
    },
    variant: {
      ghost: "badge-ghost",
      outline: "badge-outline",
      dash: "badge-dash",
      soft: "badge-soft",
      none: "",
    },
  },
});

export const Tag: Component<TagProps> = (props) => {
  const style = props.colorHex
    ? {
        "background-color": `${props.colorHex}40`,
        color: `${props.colorHex}`,
        "border-color": `${props.colorHex}`,
      }
    : {};

  return (
    <div
      style={style}
      class={tag({
        size: props.size,
        class: props.class,
        appearance: props.appearance,
        variant: props.variant,
      })}
    >
      <span>{props.title}</span>
      {props.onDelete && (
        <KobalteButton onClick={props.onDelete}>
          <CloseIcon class="w-[1em] h-[1em]" stroke-width={4} />
        </KobalteButton>
      )}
    </div>
  );
};

export default Tag;
