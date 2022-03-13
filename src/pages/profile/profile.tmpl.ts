import Button from "../../components/button";
import Form from "../../components/form";
import Modal from "../../components/modal";
import { Props } from "../../layout/block/types";
import { generateAvatar } from "../../utils/generateavatar";

export const template = (props: {
  modal: Modal;
  title: string;
  userData: string;
  btnLogout: Button;
  btnChangeData: Button;
  btnChangePass: Button;
  changeData: Form;
  changePass: Form;
  user: Props;
}) => `
<div class="profile">
    ${props.modal}
    <div class="profile__block-avatar">
        ${props.user ? generateAvatar(props.user, 20).outerHTML : ""}
    </div>
    <div class="profile__block">
        <span class="profile__block-title">${props.user ? props.user.display_name : ""}</span>
        <ul class="profile__block-info">
            <li class="profile__block-item">
                <span>Имя</span>
                <span>${props.user ? props.user.first_name : ""}</span>
            </li>
            <li class="profile__block-item">
                <span>Фамилия</span>
                <span>${props.user ? props.user.second_name : ""}</span>
            </li>
            <li class="profile__block-item">
                <span>Имя в чате</span>
                <span>${props.user ? props.user.display_name : ""}</span>
            </li>
            <li class="profile__block-item">
                <span>Логин</span>
                <span>${props.user ? props.user.login : ""}</span>
            </li>
            <li class="profile__block-item">
                <span>E-mail</span>
                <span>${props.user ? props.user.email : ""}</span>
            </li>
            <li class="profile__block-item">
                <span>Телефон</span>
                <span>${props.user ? props.user.phone : ""}</span>
            </li>
        </ul>
        ${props.btnLogout}
    </div>
        ${props.changeData}
        ${props.changePass}
    <div class="profile__block-buttons">
        ${props.btnChangeData}
        ${props.btnChangePass}
    </div>
</div
            `;
