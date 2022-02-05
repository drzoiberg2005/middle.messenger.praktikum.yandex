export default function template(props: {
  id: string;
  class: string;
  type: string;
  label: string;
}) {
  return `
  <button id="${props.id}" class="${props.class}" type="${props.type}">
    ${props?.label}
  </button>`;
}
