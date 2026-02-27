import { Accessor, JSXElement } from "solid-js";
type AlertDialogContextType = {
    id: string;
    actions?: JSXElement;
    open: Accessor<boolean>;
    setOpen: (v: boolean) => void;
};
export declare const AlertDialogContext: import("solid-js").Context<AlertDialogContextType | undefined>;
export {};
