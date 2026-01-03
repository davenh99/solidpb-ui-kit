import { ParentComponent } from "solid-js";
interface Props {
    class?: string;
    img?: string;
    imgAlt?: string;
    bodyClass?: string;
}
export declare const Card: ParentComponent<Props> & {
    Title: typeof CardTitle;
};
interface CardTitleProps {
    class?: string;
}
declare const CardTitle: ParentComponent<CardTitleProps>;
export default Card;
