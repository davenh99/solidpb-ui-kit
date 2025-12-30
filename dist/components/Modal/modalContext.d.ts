import { Accessor, Setter } from "solid-js";
type ModalContextType = {
    loading: Accessor<boolean>;
    setLoading: Setter<boolean>;
};
export declare const ModalContext: import("solid-js").Context<ModalContextType | undefined>;
export {};
