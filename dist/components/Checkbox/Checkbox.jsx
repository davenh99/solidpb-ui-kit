import { splitProps } from "solid-js";
import { tv } from "tailwind-variants";
const checkbox = tv({
    base: "checkbox",
    variants: {
        size: {
            xs: "checkbox-xs",
            sm: "checkbox-sm",
            md: "checkbox-md",
            lg: "checkbox-lg",
            xl: "checkbox-xl",
        },
        appearance: {
            primary: "checkbox-primary",
            secondary: "checkbox-secondary",
            success: "checkbox-success",
            warning: "checkbox-warning",
            error: "checkbox-error",
            info: "checkbox-info",
            accent: "checkbox-accent",
            neutral: "checkbox-neutral",
        },
    },
    defaultVariants: {
        size: "sm",
    },
});
export const Checkbox = (props) => {
    const [local, inputProps] = splitProps(props, ["label", "size", "appearance", "class", "onChange"]);
    return (<label class="flex items-center gap-3 w-fit">
      <input {...inputProps} type="checkbox" class={checkbox({
            size: local.size,
            appearance: local.appearance,
            class: local.class,
        })} onChange={(e) => {
            local.onChange?.(e.currentTarget.checked);
        }}/>

      {local.label && <span class="select-none">{local.label}</span>}
    </label>);
};
export default Checkbox;
