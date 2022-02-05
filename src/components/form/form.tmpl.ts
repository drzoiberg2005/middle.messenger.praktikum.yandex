export default function template(props: {
  id: string;
  title: string;
  warning: string;
  class: string;
  inputs: { [k: string]: string }[];
  buttons: { [k: string]: string }[];
}) {
  const blockButtons = props.buttons
    .map((element: { [k: string]: string }): string => {
      return element.button;
    })
    .reduce((a, b) => a + b);
  const blockInputs = props.inputs
    .map((element: { [k: string]: string }): string => {
      return element.input;
    })
    .reduce((a, b) => a + b);

  return `
  <form id="${props.id}" class="${props.class ? props.class : "form"}">
    <div class="form__block">
        ${blockInputs}
    </div>
    <span class="form__warning-message"></span>
    ${blockButtons}
  </form>`;
}
