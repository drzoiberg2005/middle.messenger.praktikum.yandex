/* eslint-disable no-nested-ternary */
import { Props } from "../../../layout/block/types";

const template = (message: Props, id: number) =>
  `<li class="messages__item ${message.message.user_id === id ? "__send" : ""}">
        <div class="messages__item-block ${message.message.user_id === id ? "__send" : ""}">
            <span class="message__item-text">
                ${message.message.content}
            </span>
            <div>
            ${message.message.user_id !== id ? message.name : (message.message.is_read ? "Прочитано": "")}
            </div>
        </div>
    </li>
    `;

export default template;
