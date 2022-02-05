import { logotype } from "../../constants/logotype";

export default function template(props: {
  id: string;
  avatar: HTMLElement;
  buttons: { [k: string]: string }[];
}) {
  const blockButtons = props.buttons
    .map((element: { [k: string]: string }): string => {
      return `<li>${element.button}</li>`;
    })
    .reduce((a, b) => a + b);

  return `
          <div class="sidebar" id="${props.id}">
            <ul class="sidebar__menu">
                ${blockButtons}
            </ul>
              <span class="sidebar__logo">${logotype}</span>
          `;
}
