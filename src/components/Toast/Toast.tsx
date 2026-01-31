import { Component, createMemo, splitProps } from "solid-js";
import { Toast as KToast, ToastRootProps } from "@kobalte/core/toast";
import X from "lucide-solid/icons/x";
import { tv } from "tailwind-variants";

interface Props extends ToastRootProps {
  title: string;
  msg: string;
  appearance?: "primary" | "secondary" | "success" | "warning" | "error" | "neutral" | "info" | "accent";
}

const toast = tv({
  base: `alert flex flex-col items-center justify-between gap-1 border-1
        rounded-md px-2 py-1 data-[opened]:animate-slideIn data-[closed]:animate-hide
        data-[swipe=move]:translate-x-[var(--kb-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0
        data-[swipe=cancel]:transition-transform data-[swipe=cancel]:duration-200 data-[swipe=cancel]:ease-out
        data-[swipe=end]:animate-swipeOut shadow-md`,
  variants: {
    appearance: {
      primary: "alert-primary",
      secondary: "alert-secondary",
      success: "alert-success",
      warning: "alert-warning",
      error: "alert-error",
      neutral: "alert-neutral",
      info: "alert-info",
      accent: "alert-accent",
    },
  },
});

export const Toast: Component<Props> = (props) => {
  const [local, rootProps] = splitProps(props, ["msg", "title", "appearance"]);

  const classes = createMemo(() => toast({ appearance: local.appearance }));

  return (
    <KToast {...rootProps} class={classes()}>
      <div class={`flex items-start w-full`}>
        <div>
          <KToast.Title class="text-md truncate">{local.title}</KToast.Title>
          <KToast.Description class="text-xs line-clamp-4">{local.msg}</KToast.Description>
        </div>
        <KToast.CloseButton class="shrink-0 ml-auto btn btn-ghost btn-xs btn-square">
          <X size={16} />
        </KToast.CloseButton>
      </div>
    </KToast>
  );
};

export default Toast;
