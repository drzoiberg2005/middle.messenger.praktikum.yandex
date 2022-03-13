import { generateAvatar } from "../../utils/generateavatar";
import { HeaderProps } from "../../layout/block/types";

export default function template(props: HeaderProps) {  
  return `
    <div class="header" id="${props.id}">
      <span class="header__title">${props.page}</span>
      <div class="header__user">
        ${props.page === "Чат" ? `<div class="header__user-avatar">${props.user ? generateAvatar(props.user, 6).outerHTML : ""}</div>
        <span class="header__user-name">${props.user ? `${props.user.first_name} ${props.user.second_name}`: ""}</span>` : ""}
      </div>
    </div>
    `;
}
