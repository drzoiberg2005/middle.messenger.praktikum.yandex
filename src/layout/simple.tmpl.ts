import { logotype } from "../constants/logotype";
import Block from "./block";

export default function template(props: {
  id: string;
  page: string;
  main: Block;
}) {
  return `
      <div id="${props.id}" class="simple__page">
          <div class="simple__page-content">
              <div class=simple__page-content-item __border>
                <span class="simple__page-content-item-title">
                    ${logotype}
                </span>
              </div>
              <div class=simple__page-content-item __border>
                <span class="simple__page-content-item-title">
                    ${props.page}
                </span>
              </div>
              <main>
              ${props.main}
              </main>
          </div>
      </div>
      `;
}
