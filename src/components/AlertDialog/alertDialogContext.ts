import { Accessor, createContext, JSXElement } from "solid-js";

type AlertDialogContextType = {
  id: string;
  actions?: JSXElement;
  open: Accessor<boolean>;
  setOpen: (v: boolean) => void;
};

export const AlertDialogContext = createContext<AlertDialogContextType>();
