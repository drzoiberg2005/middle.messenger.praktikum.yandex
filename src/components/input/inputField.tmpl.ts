export default function template(props: {
  id: string;
  name: string;
  type: string;
  value: string;
  suggested: string;
}) {
  return `<input id="input${props.id}" class="input__input" name="${props.name}" type=${props.type} value="${props.value}" suggested="${props.suggested}" autocomplete="on">`;
}
