import Block from "../../layout/block/index";
import { Props } from "../../layout/block/types";
import { template } from "./profile.tmpl";
import "./profile.scss";
import Button from "../../components/button";
import { generateAvatar } from "../../utils/generateavatar";
import { user } from "../../constants/logotype";
import { navigateTo } from "../../../static/router";
import Modal from "../../components/modal";
import Form from "../../components/form";
import { fileForm, infoForm, passwordForm } from "../../constants/inputs";
import { formSubmit } from "../../utils/events";

export default class Profile extends Block {
  constructor(props: Props = {}) {
    const btnChangeData = new Button({
      className: "button",
      label: "Изменить данные",
      events: {
        click: () => {
          this.setProps({ title: "", userData: "" });
          btnChangeData.hide();
          btnLogout.hide();
          btnChangePass.hide();
          avatar.hide();
          changeData.show();
        },
      },
    });

    const btnLogout = new Button({
      className: "button __cancel",
      label: "Выйти из профиля",
      events: {
        click: () => {
          navigateTo("/");
        },
      },
    });

    const formModal = new Form({
      formInputs: fileForm,
      formButtons: [
        {
          label: "Выбрать файл",
          className: "button",
          type: "button",
          events: {
            click: () => this.getElement().querySelector("input")?.click(),
          },
        },
      ]
    });

    const userInfo: { [k: string]: string } = {
      ID: user.id,
      Имя: user.first_name,
      Фамилия: user.second_name,
      Логин: user.login,
      "E-mail": user.email,
      Телефон: user.phone,
    };

    const userDataTmpl = () => {
      let tmpl = "";
      // eslint-disable-next-line no-restricted-syntax
      for (const key in userInfo) {
        // eslint-disable-next-line no-prototype-builtins
        if (userInfo.hasOwnProperty(key)) {
          tmpl += `
            <li class="profile__block-item">
                <span>${key}</span>
                <span>${userInfo[key]}</span>
            </li>
            `;
        }
      }
      return tmpl;
    };

    const userData = userDataTmpl();

    const changeData = new Form({
      formInputs: infoForm,
      formButtons: [
        {
          label: "Сохранить",
          className: "button",
          type: "submit",
        },
        {
          label: "Закрыть",
          className: "button __cancel",
          type: "cancel",
          events: {
            click: (e: Event) => {
              e.preventDefault();
              this.setProps({
                title: user.display_name,
                userData: userDataTmpl(),
              });
              btnChangeData.show();
              btnLogout.show();
              btnChangePass.show();
              avatar.show();
              changeData.hide();
            },
          },
        },
      ],
      events: {
        submit: formSubmit,
      },
    });

    const avatar = new Button({
      className: "none",
      label: generateAvatar(user, 20).outerHTML,
      events: { click: () => modal.show() },
    });

    const btnChangePass = new Button({
      className: "button",
      label: "Изменить пароль",
      events: {
        click: () => {
          this.setProps({ title: "", userData: "" });
          btnChangeData.hide();
          btnLogout.hide();
          btnChangePass.hide();
          avatar.hide();
          changePass.show();
        },
      },
    });

    changeData.hide();

    const changePass = new Form({
      formInputs: passwordForm,
      formButtons: [
        {
          label: "Сохранить",
          className: "button",
          type: "submit",
        },
        {
          label: "Закрыть",
          className: "button __cancel",
          type: "cancel",
          events: {
            click: (e: Event) => {
              e.preventDefault();
              this.setProps({
                title: user.display_name,
                userData: userDataTmpl(),
              });
              btnChangeData.show();
              btnLogout.show();
              btnChangePass.show();
              avatar.show();
              changePass.hide();
            },
          },
        },
      ],
      events: {
        submit: formSubmit,
      },
    });

    changePass.hide();

    const modal = new Modal({ form: formModal });

    super("div", {
      id: props.id,
      avatar,
      btnChangeData,
      btnChangePass,
      btnLogout,
      title: user.display_name,
      userData,
      modal,
      changeData,
      changePass,
    });
  }

  render() {
    return this.setTemplate(template, this.props);
  }
}
