import Block from "src/layout/block";
import Button from "../button";

export default function template(props: {
  id: string;
  label: string;
  form: Block;
  closeBtn: Button;
}) {
  return `
    <div id="${props.id}" class="modal__main">
      <div class="modal__block">
      <span class="modal__label">${props.label ? props.label : ""}</span>
        ${props.form}
        ${props.closeBtn}
      </div>
    </div>`;
}
