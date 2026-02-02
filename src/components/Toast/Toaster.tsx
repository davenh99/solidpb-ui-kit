import { Component } from "solid-js";
import { Portal } from "solid-js/web";
import { Toast } from "@kobalte/core/toast";

export const Toaster: Component = () => {
  return (
    <Portal>
      <Toast.Region>
        <Toast.List class="z-1000000 toast toast-top w-80 max-w-[100vw] m-0" />
      </Toast.Region>
    </Portal>
  );
};

export default Toaster;
