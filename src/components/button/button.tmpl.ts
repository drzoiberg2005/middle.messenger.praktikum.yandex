import { ButtonProps } from "src/layout/block/types";

export default function template(props: ButtonProps) {
  return `
  <button id="${props.id}" class="${props.className ? props.className : "button"}" type="${props.type}">
    ${props.label}
  </button>`;
}
