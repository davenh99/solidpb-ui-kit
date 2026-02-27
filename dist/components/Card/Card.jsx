import { Show } from "solid-js";
import { tv } from "tailwind-variants";
const card = tv({
    base: "card bg-base-100 shadow-sm border border-base-200",
});
const cardBody = tv({
    base: "card-body w-full",
});
const cardImage = tv({
    base: "px-4 pt-4",
});
export const Card = (props) => {
    return (<div class={card({ class: props.class })}>
      <Show when={props.img}>
        <figure class={cardImage({ class: props.imgClass })}>
          <img src={props.img} alt={props.imgAlt ?? "Card Image"}/>
        </figure>
      </Show>
      <div class={cardBody({ class: props.bodyClass })}>{props.children}</div>
    </div>);
};
const cardTitle = tv({
    base: "card-title",
});
const CardTitle = (props) => {
    return <h2 class={cardTitle({ class: props.class })}>{props.children}</h2>;
};
Card.Title = CardTitle;
export default Card;
