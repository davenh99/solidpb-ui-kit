import { ParentComponent } from "solid-js";
import { Popover as KPopover } from "@kobalte/core/popover";

interface Props {
  msg: string;
}

export const Popover: ParentComponent<Props> = (props) => {
  return (
    <KPopover>
      <KPopover.Trigger class="ml-1 inline-flex items-center text-ash-gray-500 hover:opacity-80 transition-colors">
        {props.children}
      </KPopover.Trigger>

      <KPopover.Portal>
        <KPopover.Content
          class="
            z-50 px-3 py-2 rounded-lg text-sm leading-snug
            bg-charcoal-700 text-ash-gray-50 shadow-xl border border-charcoal-600
            max-w-50 break-words whitespace-normal
            animate-fade-in-up
          "
        >
          <KPopover.Arrow class="fill-charcoal-700" />
          {props.msg}
        </KPopover.Content>
      </KPopover.Portal>
    </KPopover>
  );
};

export default Popover;
