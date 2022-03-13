/* eslint-disable max-len */
import { InputProps } from "src/layout/block/types";

export default function template(props: InputProps) {
  return `
          <div class="${props.className ? props.className : "input__unit"}" id="${props.id}">
            <label class="input__title" for="input${props.id}">
              ${props.label}
            </label>
            <input id="input${props.id}" class="${props.className ? props.className : "input__input"}" name="${props.name}" type=${props.type} value="${props.value}" suggested="${props.suggested}" autocomplete="on">
          </div>
          `;
}
