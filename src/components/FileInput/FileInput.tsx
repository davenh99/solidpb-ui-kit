import { Component, Show, splitProps } from "solid-js";
import { tv } from "tailwind-variants";

interface FileInputProps {
  label?: string;
  onChange: (files: FileList | null) => void;
  accept?: string;
  multiple?: boolean;
  class?: string;
}

const root = tv({ base: "flex flex-col gap-1" });
const input = tv({
  base: "block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold transition",
});

export const FileInput: Component<FileInputProps> = (props) => {
  const [local, others] = splitProps(props, ["label", "class", "onChange"]);

  return (
    <div class={root({ class: local.class })}>
      <Show when={local.label}>
        <label class="block mb-1 text-xs font-medium">{local.label}</label>
      </Show>
      <input
        type="file"
        class={input()}
        accept={props.accept}
        multiple={props.multiple}
        {...others}
        onChange={(e) => local.onChange(e.currentTarget.files)}
      />
    </div>
  );
};

export default FileInput;
