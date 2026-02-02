import { createContext, useContext } from "solid-js";

export const InternalFormContext = createContext<any>();

export function useInternalFormContext() {
  const ctx = useContext(InternalFormContext);
  if (!ctx) {
    throw new Error("useInternalFormContext must be used inside Form");
  }
  return ctx;
}
