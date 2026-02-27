import { ParentComponent, useContext, createSignal, splitProps } from "solid-js";
import { Dialog } from "@kobalte/core/dialog";
import { Portal } from "solid-js/web";
import Close from "lucide-solid/icons/x";
import { tv } from "tailwind-variants";

import { Button, ButtonProps } from "../Button";
import { ModalContext } from "./modalContext";

interface ModalProps {
  title?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface ModalComponents {
  Trigger: ParentComponent<ButtonProps>;
  Modal: ParentComponent<{ class?: string }>;
}

export const Modal: ParentComponent<ModalProps> & ModalComponents = (props) => {
  return (
    <ModalContext.Provider value={{ title: props.title, setOpen: props.onOpenChange }}>
      <Dialog open={props.open} onOpenChange={props.onOpenChange}>
        {props.children}
      </Dialog>
    </ModalContext.Provider>
  );
};

export const ModalTrigger: ParentComponent<ButtonProps> = (props) => {
  const [local, others] = splitProps(props, ["children"]);

  return (
    <Dialog.Trigger as={Button} {...others}>
      {local.children}
    </Dialog.Trigger>
  );
};

const modalContent = tv({
  base: "modal-box w-full sm:max-w-2xl max-w-[90%]",
});

export const ModalContent: ParentComponent<{ class?: string }> = (props) => {
  const { title } = useModal();

  return (
    <Dialog.Portal>
      <div class="modal modal-open z-10">
        <Dialog.Content class={modalContent({ class: props.class })}>
          <div class="flex justify-between items-start">
            {title && (
              <Dialog.Title>
                <h3 class="font-bold text-lg mb-2">{title}</h3>
              </Dialog.Title>
            )}
            <Dialog.CloseButton as={Button} variant="ghost" modifier="square" size="xs">
              <Close size={20} />
            </Dialog.CloseButton>
          </div>
          {props.children}
        </Dialog.Content>
      </div>
    </Dialog.Portal>
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
