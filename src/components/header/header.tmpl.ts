import { HeaderProps } from "src/layout/block/types";

export default function template(props: HeaderProps) {
  return `
    <div class="header" id="${props.id}">
        <span class="header__title">${props.title}</span>
        ${props.button}
    `;
}
