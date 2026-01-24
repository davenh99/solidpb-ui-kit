import { AlertDialog as KAlertDialog } from "@kobalte/core/alert-dialog";
import { JSX, ParentComponent, Setter } from "solid-js";
import Delete from "lucide-solid/icons/x";
import { Button, ButtonProps } from "../Button";

interface Props {
  title: string;
  description: string;
  buttons?: JSX.Element;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: Setter<boolean>;
}

export const AlertDialog: ParentComponent<Props> & { Button: typeof AlertDialogButton } = (props) => {
  return (
    <KAlertDialog open={props.open} onOpenChange={props.onOpenChange} modal defaultOpen={props.defaultOpen}>
      <KAlertDialog.Trigger class="w-full">{props.children}</KAlertDialog.Trigger>
      <KAlertDialog.Portal>
        <KAlertDialog.Overlay class="fixed inset-0 z-50 bg-black/20 opacity-0 transition-all duration-1000 data-expanded:opacity-100" />
        <div class="flex justify-center items-center fixed inset-0 z-50">
          <KAlertDialog.Content class="card bg-base-100">
            <div class="card-body p-4">
              <div class="flex items-center justify-between mb-2">
                <KAlertDialog.Title class="font-bold">{props.title}</KAlertDialog.Title>
                <KAlertDialog.CloseButton class="btn btn-ghost btn-square btn-xs">
                  <Delete size={20} />
                </KAlertDialog.CloseButton>
              </div>
              <KAlertDialog.Description>{props.description}</KAlertDialog.Description>
              <div class="flex justify-end space-x-2 mt-4">{props.buttons}</div>
            </div>
          </KAlertDialog.Content>
        </div>
      </KAlertDialog.Portal>
    </KAlertDialog>
  );
};

const AlertDialogButton: ParentComponent<ButtonProps> = (props) => {
  return <Button {...props} size="sm"></Button>;
};

AlertDialog.Button = AlertDialogButton;

export default AlertDialog;
