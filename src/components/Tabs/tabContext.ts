import { Accessor, createContext } from "solid-js";

type ModalContextType = {
  id: string;
  title?: string;
  open: Accessor<boolean>;
  setOpen: (v: boolean) => void;
};

export const ModalContext = createContext<ModalContextType>();
