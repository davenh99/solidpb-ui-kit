import { Accessor } from "solid-js";
type ModalContextType = {
    id: string;
    title?: string;
    open: Accessor<boolean>;
    setOpen: (v: boolean) => void;
};
export declare const ModalContext: import("solid-js").Context<ModalContextType | undefined>;
export {};
