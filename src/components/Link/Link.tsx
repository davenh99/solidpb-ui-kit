import { JSX, ValidComponent, ParentComponent, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { tv } from "tailwind-variants";

interface LinkProps {
  as?: ValidComponent;
  href?: string;
  children: JSX.Element;
  class?: string;
}

const link = tv({
  base: "text-[var(--color-light-primary)] dark:text-[var(--color-dark-primary)] hover:underline underline-offset-4 transition",
});

export const Link: ParentComponent<LinkProps> = (props) => {
  const [local, others] = splitProps(props, ["as", "children", "class"]);

  return (
    <Dynamic component={local.as ?? "a"} {...others} class={link({ class: local.class })}>
      {local.children}
    </Dynamic>
  );
};

export default Link;
