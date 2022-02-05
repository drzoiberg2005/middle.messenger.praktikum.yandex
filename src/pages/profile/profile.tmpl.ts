import Button from "src/components/button";
import Form from "src/components/form";
import Modal from "src/components/modal";

export const template = (props: {
  modal: Modal;
  avatar: Button;
  title: string;
  userData: string;
  btnLogout: Button;
  btnChangeData: Button;
  btnChangePass: Button;
  changeData: Form;
  changePass: Form;
}) => {
  return `
    <div class="profile">
    ${props.modal}
        <div class="profile__block-avatar">
            ${props.avatar}
        </div>
        <div class="profile__block">
            <span class="profile__block-title">${props.title}</span>
            <ul class="profile__block-info">
            ${props.userData}
            ${props.changeData}
            ${props.changePass}
            </ul>
            ${props.btnLogout}
        </div>
        <div class="profile__block-buttons">
            ${props.btnChangeData}
            ${props.btnChangePass}
        </div>
    </div
            `;
};
