import Block from "src/layout/block";

export default function template(props: {
  id: string;
  label: string;
  modifikator: string;
  inputFld: Block;
}) {
  return `
          <div class="input__unit ${props.modifikator}" id="${props.id}">
            <label class="input__title" for="input${props.id}">
              ${props.label}
            </label>
            ${props.inputFld}
          </div>
          `;
}
