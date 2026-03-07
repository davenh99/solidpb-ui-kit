import { ParentComponent } from "solid-js";
import { tv } from "tailwind-variants";

interface Props {
  class?: string;
}

const container = tv({
  base: "flex-1 bg-base-100 min-h-[calc(100vh-4rem)] py-4 px-[2vw]",
});

export const Container: ParentComponent<Props> = (props) => {
  const classes = container({ class: props.class });

  return <div class={classes}>{props.children}</div>;
};

export default Container;
