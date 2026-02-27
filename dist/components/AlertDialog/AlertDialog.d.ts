import { JSXElement, ParentComponent } from "solid-js";
import { ButtonProps } from "../Button";
interface AlertDialogProps {
    id: string;
    actions?: JSXElement;
}
interface AlertDialogContentProps {
    title: string;
}
interface AlertDialogComponents {
    Button: ParentComponent<ButtonProps>;
    Buttons: ParentComponent;
    Content: ParentComponent<AlertDialogContentProps>;
    Trigger: ParentComponent<ButtonProps>;
}
export declare const AlertDialog: ParentComponent<AlertDialogProps> & AlertDialogComponents;
export declare const AlertDialogButton: ParentComponent<ButtonProps>;
export declare const AlertDialogButtons: ParentComponent;
export declare const AlertDialogTrigger: ParentComponent<ButtonProps>;
export declare const AlertDialogContent: ParentComponent<AlertDialogContentProps>;
export default AlertDialog;
export declare function useAlertDialog(): {
    id: string;
    actions?: JSXElement;
    open: import("solid-js").Accessor<boolean>;
    setOpen: (v: boolean) => void;
};
