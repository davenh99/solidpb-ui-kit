import { JSX, createSignal } from "solid-js";

export interface DrawerProps {
  side?: "left" | "right";
  open?: boolean;
  onClose?: () => void;
  children?: JSX.Element;
  class?: string;
}

export default function Drawer(props: DrawerProps) {
  const [open, setOpen] = createSignal(props.open ?? false);

  function handleClose() {
    setOpen(false);
    props.onClose?.();
  }

  return (
    <>
      <input
        type="checkbox"
        class="drawer-toggle"
        checked={open()}
        onChange={(e) => setOpen(e.currentTarget.checked)}
        style={{ display: "none" }}
      />
      <div class={`drawer drawer-${props.side || "left"} ${props.class || ""}`.trim()}>
        <div class="drawer-content">
          {/* Main content goes here */}
          {props.children}
        </div>
        <div class="drawer-side">
          <label class="drawer-overlay" onClick={handleClose}></label>
          <div class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Drawer content here */}
            <slot />
          </div>
        </div>
      </div>
    </>
  );
}
