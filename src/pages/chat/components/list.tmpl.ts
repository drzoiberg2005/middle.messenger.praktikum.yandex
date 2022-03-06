
import { Props } from "../../../layout/block/types";
import { generateAvatar } from "../../../utils/generateavatar";

const template = (props: Props, id: number) => 
  `
        <li data-value="chats" data-id=${props.id} class="list__item ${props.id.toString() === id ? "__active" : ""}">
            <div class="list__item-left-avatar ">
            ${generateAvatar(props, 5, false).outerHTML}
            </div>
            <div class="list__item-left-text">
                <span class="list__item-left-text-contact">
                    ${props.title}
                </span>
                <span class="list__item-left-text-message">
                    ${props.last_message ? props.last_message.content : ""}
                </span>
            </div>
        <div class="list__item-right">
        <span class="list__item-right-time">
        </span>
        ${props.unread_count > 0? `<span class="list__item-right-counter">${props.unread_count}
        </span>`: ""}
        </div>
    </li>
        `;

export default template;
