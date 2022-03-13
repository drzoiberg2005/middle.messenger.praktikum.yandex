import { FormProps } from "src/layout/block/types";

export default function template(props: FormProps): string {
  const blockButtons = props.buttons
    ?.map((element) => element.button)
    .reduce((a: any, b: any) => a + b);
  const blockInputs = props.inputs
    ?.map((element) => element.input)
    .reduce((a: any, b: any) => a + b);

  return `
  <form id="${props.id}" class="${props.className ? props.className : "form"}"> 
    <div class="form__block">
        ${blockInputs}
    </div>
    <span class="form__warning-message"></span>
    ${blockButtons}
  </form>`;
}
