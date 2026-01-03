import { ParentComponent, Show } from "solid-js";
import { tv } from "tailwind-variants";

interface Props {
  class?: string;
  img?: string;
  imgAlt?: string;
  bodyClass?: string;
}

const card = tv({
  base: "card bg-base-100 shadow-sm",
});

const cardBody = tv({
  base: "card-body w-full",
});

export const Card: ParentComponent<Props> & { Title: typeof CardTitle } = (props) => {
  return (
    <div class={card({ class: props.class })}>
      <Show when={props.img}>
        <figure>
          <img src={props.img} alt={props.imgAlt ?? "Card Image"} />
        </figure>
      </Show>
      <div class={cardBody({ class: props.bodyClass })}>{props.children}</div>
    </div>
  );
};

interface CardTitleProps {
  class?: string;
}

const cardTitle = tv({
  base: "card-title",
});

const CardTitle: ParentComponent<CardTitleProps> = (props) => {
  return <h2 class={cardTitle({ class: props.class })}>{props.children}</h2>;
};

Card.Title = CardTitle;

export default Card;
