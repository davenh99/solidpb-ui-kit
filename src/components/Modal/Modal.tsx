import { ParentComponent, useContext, createSignal } from "solid-js";
import Close from "lucide-solid/icons/x";
import { tv } from "tailwind-variants";

import { Button } from "../Button";
import { ModalContext } from "./modalContext";

interface ModalProps {
  id: string;
  title?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface ModalComponents {
  Trigger: ParentComponent;
  Modal: ParentComponent<{ class?: string }>;
}

export const Modal: ParentComponent<ModalProps> & ModalComponents = (props) => {
  const [_open, _setOpen] = createSignal(false);

  const open = () => props.open ?? _open();

  const handleOpen = (v: boolean) => {
    const dialog = document.getElementById(props.id) as HTMLDialogElement;
    if (v) {
      dialog.showModal();
    } else {
      dialog.close();
    }
    _setOpen(v);
    props.onOpenChange?.(v);
  };

  return (
    <ModalContext.Provider value={{ id: props.id, open, setOpen: handleOpen, title: props.title }}>
      {props.children}
    </ModalContext.Provider>
  );
};

export const ModalTrigger: ParentComponent = (props) => {
  const { setOpen } = useModal();

  return <Button onClick={() => setOpen(true)}>{props.children}</Button>;
};

const modalContent = tv({
  base: "modal-box w-full max-w-2xl",
});

export const ModalContent: ParentComponent<{ class?: string }> = (props) => {
  const { id, title, setOpen } = useModal();

  return (
    <dialog id={id} class="modal">
      <div class={modalContent({ class: props.class })}>
        <div class="flex justify-between items-start">
          {title && <h3 class="font-bold text-lg mb-2">{title}</h3>}
          <Button variant="ghost" modifier="square" size="xs" onClick={() => setOpen(false)}>
            <Close size={20} />
          </Button>
        </div>
        {props.children}
      </div>
      <form method="dialog" class="modal-backdrop">
        <button class="cursor-auto">close</button>
      </form>
    </dialog>
  );
};

Modal.Trigger = ModalTrigger;
Modal.Modal = ModalContent;

export default Modal;

export function useModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within a Modal");
  }

  return context;
}
