import Button from "../../components/button";

export default function template(props: { button: Button }) {
  return `
    <div>
        <div class="simple__page-content-item __border">
            <span class="simple__page-content-item-subtitle">ПРОИЗОШЛА ОШИБКА</span>
            <span class="simple__page-content-item-subtitle">УЖЕ ИСПРАВЛЯЕМ</span>
        </div>
        <div class="simple__page-content-item __border">
            ${props.button}
        </div>
    </div>`;
}
