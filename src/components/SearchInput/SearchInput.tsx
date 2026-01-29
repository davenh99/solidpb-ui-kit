import { Component } from "solid-js";
import { TextField } from "@kobalte/core/text-field";
import { tv } from "tailwind-variants";
import Search from "lucide-solid/icons/search";

interface SearchInputProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  class?: string;
  variant?: "ghost";
  appearance?: "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const search = tv({
  base: "input outline-offset-0",
  variants: {
    variant: {
      ghost: "input-ghost",
      none: "",
    },
    size: {
      xs: "input-xs",
      sm: "input-sm",
      md: "input-md",
      lg: "input-lg",
      xl: "input-xl",
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
  },
});

export const SearchInput: Component<SearchInputProps> = (props) => (
  <TextField value={props.value} onChange={props.onChange}>
    <TextField.Label
      class={search({
        class: props.class,
        variant: props.variant,
        size: props.size,
        appearance: props.appearance,
      })}
    >
      <Search class="w-[1em] h-[1em] shrink-0 opacity-70" />
      <TextField.Input placeholder={props.placeholder || "Search"} class="grow" />
    </TextField.Label>
  </TextField>
);

export default SearchInput;
