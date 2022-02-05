import Block from "../../layout/block/index";
import { Props } from "../../layout/block/types";
import { template } from "./profile.tmpl";
import "./profile.scss";
import Button from "../../components/button";
import { generateavatar } from "../../utils/generateavatar";
import { user } from "../../constants/logotype";
import { navigateTo } from "../../../static/router";
import Modal from "../../components/modal";
import Form from "../../components/form";
import { fileForm, infoForm, passwordForm } from "../../constants/inputs";
import { formSubmit } from "../../utils/events";

export default class Profile extends Block {
  constructor(props: Props = {}) {
    const avatar = new Button({
      label: generateavatar(user, 20).outerHTML,
      events: { click: () => modal.show() },
    });

    let title = user.display_name;

    const btnChangePass = new Button({
      class: "button",
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

    const btnChangeData = new Button({
      class: "button",
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
      class: "button __cancel",
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
          class: "button",
          type: "button",
          events: {
            click: () => this.getElement().querySelector("input")?.click(),
          },
        },
      ],
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
      for (var key in userInfo) {
        if (userInfo.hasOwnProperty(key)) {
          tmpl =
            tmpl +
            `
            <li class="profile__block-item">
                <span>${key}</span>
                <span>${userInfo[key]}</span>
            </li>
            `;
        }
      }
      return tmpl;
    };

    let userData = userDataTmpl();

    const changeData = new Form({
      formInputs: infoForm,
      warning: "",
      formButtons: [
        {
          label: "Сохранить",
          class: "button",
          type: "submit",
        },
        {
          label: "Закрыть",
          class: "button __cancel",
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

    changeData.hide();

    const changePass = new Form({
      formInputs: passwordForm,
      warning: "",
      formButtons: [
        {
          label: "Сохранить",
          class: "button",
          type: "submit",
        },
        {
          label: "Закрыть",
          class: "button __cancel",
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
      ...props,
      avatar,
      btnChangeData,
      btnChangePass,
      btnLogout,
      title,
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
