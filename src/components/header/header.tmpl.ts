import Button from "../button";

export default function template(props: {
  id: string;
  title: string;
  button: Button;
}) {
  return `
    <div class="header" id="${props.id}">
        <span class="header__title">${props.title}</span>
        ${props.button}
    `;
}
