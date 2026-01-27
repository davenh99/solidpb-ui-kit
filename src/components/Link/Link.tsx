import { PolymorphicProps } from "@kobalte/core";
import { JSXElement, ValidComponent, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { tv } from "tailwind-variants";

const link = tv({
  base: "link",
  variants: {
    appearance: {
      neutral: "link-neutral",
      primary: "link-primary",
      secondary: "link-secondary",
      accent: "link-accent",
      info: "link-info",
      success: "link-success",
      warning: "link-warning",
      error: "link-error",
    },
  },
  defaultVariants: {
    appearance: "neutral",
  },
});

type LinkProps<T extends ValidComponent = "a"> = PolymorphicProps<
  T,
  {
    href?: string;
    disabled?: boolean;
    class?: string;
    appearance?: "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";
    children: JSXElement;
  }
>;

export function Link<T extends ValidComponent = "a">(props: LinkProps<T>) {
  const [local, others] = splitProps(props, ["as", "class", "children"]);

  return (
    <Dynamic
      component={local.as ?? "a"}
      {...others}
      class={link({ class: local.class, appearance: props.appearance })}
    >
      {local.children}
    </Dynamic>
  );
}

export default Link;
