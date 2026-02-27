import { createContext } from "solid-js";

type ModalContextType = {
  title?: string;
  // open: Accessor<boolean>;
  setOpen?: (v: boolean) => void;
};

export const ModalContext = createContext<ModalContextType>();
