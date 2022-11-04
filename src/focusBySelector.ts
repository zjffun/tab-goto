export default function (selector: string, event: KeyboardEvent) {
  const element = document.querySelector(selector);
  if (element instanceof HTMLElement || element instanceof SVGElement) {
    event.preventDefault();
    element?.focus();
  }
}
