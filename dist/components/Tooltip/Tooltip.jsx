import { Tooltip as KTooltip } from "@kobalte/core/tooltip";
import { tv } from "tailwind-variants";
const tooltip = tv({
    base: "bg-[var(--color-light-surface)] dark:bg-[var(--color-dark-surface)] text-[var(--color-text-light-primary)] dark:text-[var(--color-text-dark-primary)] px-2 py-1 rounded shadow",
});
export const Tooltip = (props) => (<KTooltip>
    <KTooltip.Trigger>{props.children}</KTooltip.Trigger>
    <KTooltip.Portal>
      <KTooltip.Content class={tooltip()}>{props.content}</KTooltip.Content>
    </KTooltip.Portal>
  </KTooltip>);
export default Tooltip;
