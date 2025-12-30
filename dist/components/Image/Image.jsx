import { tv } from "tailwind-variants";
const image = tv({
    base: "object-cover",
    variants: {
        rounded: {
            true: "rounded-full",
            false: "rounded-none",
        },
    },
    defaultVariants: {
        rounded: false,
    },
});
export const Image = (props) => (<img src={props.src} alt={props.alt} class={image({ rounded: props.rounded, class: props.class })}/>);
export default Image;
