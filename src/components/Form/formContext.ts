import { createContext, useContext } from "solid-js";

type FormContextValue<T> = {
  register: <K extends keyof T>(key: K, initialValue: T[K] | undefined) => void;
  setValue: <K extends keyof T>(key: K, value: T[K]) => void;
  getValue: <K extends keyof T>(key: K) => T[K] | undefined;
  values: () => Partial<T>;
};

export const FormContext = createContext<FormContextValue<any>>();

export function useForm<T>() {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error("Form.Field must be used inside Form");
  return ctx as FormContextValue<T>;
}
