import { For, Show } from "solid-js";
import { tv } from "tailwind-variants";
const breadcrumbs = tv({
    base: "breadcrumbs text-sm",
});
export const BreadCrumbs = (props) => {
    return (<div class={breadcrumbs({ class: props.class })}>
      <ul>
        <For each={props.items}>
          {(item) => (<li>
              <Show when={item.href || item.onClick} fallback={item.label}>
                <a href={item.href} onClick={(e) => {
                if (item.onClick) {
                    e.preventDefault();
                    item.onClick();
                }
            }}>
                  {item.label}
                </a>
              </Show>
            </li>)}
        </For>
      </ul>
    </div>);
};
export default BreadCrumbs;
