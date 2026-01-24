import { Component } from "solid-js";
import { Image } from "@kobalte/core/image";
import { tv } from "tailwind-variants";

interface AvatarProps {
  src?: string;
  alt?: string;
  class?: string;
  fallback?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const avatar = tv({
  base: "rounded-full font-bold",
  variants: {
    size: {
      xs: "w-6 h-6 text-xs",
      sm: "w-8 h-8 text-sm",
      md: "w-12 h-12 text-lg",
      lg: "w-16 h-16 text-2xl",
      xl: "w-24 h-24 text-4xl",
    },
    fallback: {
      true: "bg-base-200 flex items-center justify-center",
      false: "",
    },
  },
  defaultVariants: {
    size: "md",
    fallback: false,
  },
});

export const Avatar: Component<AvatarProps> = (props) => {
  return (
    <Image fallbackDelay={100} class="avatar">
      <Image.Img src={props.src} alt={props.alt} class={avatar({ size: props.size, class: props.class })} />
      <Image.Fallback class={avatar({ size: props.size, class: props.class, fallback: true })}>
        {props.fallback}
      </Image.Fallback>
    </Image>
  );
};

export default Avatar;
