export const triggerFlash = (ref: HTMLElement) => {
  ref.animate([{ backgroundColor: "color-mix(in srgb, var(--color-primary) 10%, transparent)" }, {}], {
    duration: 700,
    easing: "cubic-bezier(0.25, 0.1, 0.25, 1.0)",
    iterations: 1,
  });
};
