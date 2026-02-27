import { ParentComponent } from "solid-js";
import { Dialog } from "@kobalte/core/dialog";
interface ModalProps {
    title?: string;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}
interface ModalComponents {
    Trigger: typeof Dialog.Trigger;
    Modal: ParentComponent<{
        class?: string;
    }>;
}
export declare const Modal: ParentComponent<ModalProps> & ModalComponents;
export declare const ModalContent: ParentComponent<{
    class?: string;
}>;
export default Modal;
export declare function useModal(): {
    title?: string;
    setOpen?: (v: boolean) => void;
};
