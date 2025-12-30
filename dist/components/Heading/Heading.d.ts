import { JSX } from "solid-js";
interface Props extends JSX.HTMLAttributes<HTMLElement> {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
    appearance?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
}
export declare const Heading: (props: Props) => JSX.Element;
export default Heading;
