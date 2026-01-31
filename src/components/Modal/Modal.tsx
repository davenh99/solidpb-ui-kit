import { ParentComponent, useContext, createSignal } from "solid-js";
import Close from "lucide-solid/icons/x";

import { Button } from "../Button";
import { ModalContext } from "./modalContext";

interface ModalProps {
  id: string;
  title?: string;
}

interface ModalComponents {
  Trigger: ParentComponent;
  Modal: ParentComponent;
}

export const Modal: ParentComponent<ModalProps> & ModalComponents = (props) => {
  const [open, setOpen] = createSignal(false);

  const handleOpen = (v: boolean) => {
    if (v) {
      const dialog = document.getElementById(props.id) as HTMLDialogElement;
      dialog.showModal();
    } else {
      const dialog = document.getElementById(props.id) as HTMLDialogElement;
      dialog.close();
    }
    setOpen(v);
  };

  return (
    <ModalContext.Provider value={{ id: props.id, open, setOpen: handleOpen, title: props.title }}>
      {props.children}
    </ModalContext.Provider>
  );
};

export const ModalTrigger: ParentComponent = (props) => {
  const { setOpen } = useContext(ModalContext)!;

  return <Button onClick={() => setOpen(true)}>{props.children}</Button>;
};

export const ModalContent: ParentComponent = (props) => {
  const { id, title, setOpen } = useContext(ModalContext)!;

  return (
    <dialog id={id} class="modal">
      <div class="modal-box">
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
