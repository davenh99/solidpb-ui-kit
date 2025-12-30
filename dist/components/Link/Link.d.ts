import { JSX, ValidComponent, ParentComponent } from "solid-js";
interface LinkProps {
    as?: ValidComponent;
    href?: string;
    children: JSX.Element;
    class?: string;
}
export declare const Link: ParentComponent<LinkProps>;
export default Link;
