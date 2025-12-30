import { ParentComponent } from "solid-js";
interface Props {
    setModalVisible?: (v: boolean) => void;
    saveFunc?: () => Promise<void>;
    zIndexClass?: string;
    title?: string;
}
export declare const Modal: ParentComponent<Props>;
export default Modal;
export declare function useModalLoading(): {
    loading: import("solid-js").Accessor<boolean>;
    setLoading: import("solid-js").Setter<boolean>;
};
