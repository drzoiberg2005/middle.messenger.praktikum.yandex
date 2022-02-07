import Button from "../../components/button";

export default function template(props: { button: Button }) {
  const titleError = "ЧТО-ТО ПОШЛО НЕ ТАКА";
  const subTitleError = "СТРАНИЦА НЕ НАЙДЕНА";
  return `
    <div>
        <div class="simple__page-content-item __border">
        <span class="simple__page-content-item-subtitle">${titleError}</span>
        <span class="simple__page-content-item-subtitle">${subTitleError}</span>
        </div>
        <div class="simple__page-content-item __border">
            ${props.button}
        </div>
    </div>`;
}
