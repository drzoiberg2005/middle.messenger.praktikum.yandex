import Button from "../../components/button";

export default function template(props: { button: Button }) {
  return `
    <div>
        <div class="simple__page-content-item __border">
            <span class="simple__page-content-item-subtitle">ЧТО-ТО ПОШЛО НЕ ТАК</span>
            <span class="simple__page-content-item-subtitle">СТРАНИЦА НЕ НАЙДЕНА</span>
        </div>
        <div class="simple__page-content-item __border">
            ${props.button}
        </div>
    </div>`;
}
