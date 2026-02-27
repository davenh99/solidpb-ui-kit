import { createSignal, useContext } from "solid-js";
import Close from "lucide-solid/icons/x";
import { Button } from "../Button";
import { AlertDialogContext } from "./alertDialogContext";
export const AlertDialog = (props) => {
    const [open, setOpen] = createSignal(false);
    const handleOpen = (v) => {
        if (v) {
            const dialog = document.getElementById(props.id);
            dialog.showModal();
        }
        else {
            const dialog = document.getElementById(props.id);
            dialog.close();
        }
        setOpen(v);
    };
    return (<AlertDialogContext.Provider value={{ id: props.id, open, setOpen: handleOpen }}>
      {props.children}
    </AlertDialogContext.Provider>);
};
export const AlertDialogButton = (props) => {
    return <Button {...props} size="sm"></Button>;
};
export const AlertDialogButtons = (props) => {
    return <div class="flex justify-end gap-2">{props.children}</div>;
};
export const AlertDialogTrigger = (props) => {
    const { open, setOpen } = useAlertDialog();
    return (<Button {...props} size="sm" onClick={() => setOpen(!open())}>
      {props.children}
    </Button>);
};
export const AlertDialogContent = (props) => {
    const { id, setOpen } = useAlertDialog();
    return (<dialog id={id} class="modal">
      <div class="modal-box">
        <div class="flex justify-between items-start">
          {props.title && <h3 class="font-bold text-lg mb-2">{props.title}</h3>}
          <Button variant="ghost" modifier="square" size="xs" onClick={() => setOpen(false)}>
            <Close size={20}/>
          </Button>
        </div>
        <div class="flex flex-col gap-2">{props.children}</div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button class="cursor-auto">close</button>
      </form>
    </dialog>);
};
AlertDialog.Button = AlertDialogButton;
AlertDialog.Buttons = AlertDialogButtons;
AlertDialog.Trigger = AlertDialogTrigger;
AlertDialog.Content = AlertDialogContent;
export default AlertDialog;
export function useAlertDialog() {
    const context = useContext(AlertDialogContext);
    if (!context) {
        throw new Error("useModal must be used within a Modal");
    }
    return context;
}
