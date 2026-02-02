import { createContext, useContext } from "solid-js";

export const DrawerContext = createContext<{ id: string }>();

export function useDrawer() {
  const ctx = useContext(DrawerContext);
  if (!ctx) {
    throw new Error("useDrawer must be used inside Drawer");
  }
  return ctx;
}
