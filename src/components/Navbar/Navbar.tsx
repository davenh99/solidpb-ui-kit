import { JSX } from "solid-js";

export interface NavbarProps {
  children?: JSX.Element;
  class?: string;
}

export default function Navbar(props: NavbarProps) {
  return (
    <nav class={`navbar bg-base-100 shadow ${props.class || ""}`}>
      <div class="flex-1">
        <a class="btn btn-ghost text-xl">Logo</a>
      </div>
      <div class="flex-none">{props.children}</div>
    </nav>
  );
}
