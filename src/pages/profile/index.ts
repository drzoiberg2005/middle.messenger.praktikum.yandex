import { Props } from "src/layout/block/types";
import Block from "../../layout/block/index";
import { template } from "./profile.tmpl";
import "./profile.scss";
import Button from "../../components/button";
import Modal from "../../components/modal";
import Form from "../../components/form";
import { fileForm, infoForm, passwordForm } from "../../constants/inputs";
import store, { StoreEvents } from "../../constants/store";
import { changePassword, changeUserData, logOut } from "../../utils/events";
import auth from "../../controllers/auth";
import { isEmpty } from "../../utils/helpers";
import chats from "../../controllers/chats";

export default class Profile extends Block {
  constructor(props: Props = {}) {
    if (props.user === "undefined") {
      throw new Error("Cannot be called directly");
    }

    const btnLogout = new Button({
      className: "button __cancel",
      label: "Выйти из профиля",
      events: {
        click: logOut,
      },
    });

    const btnChangeData = new Button({
      className: "button",
      label: "Изменить данные",
      events: {
        click: (e: Event) => {
          e.preventDefault();
          (
            document.querySelector(".profile__block") as HTMLElement
          ).style.display = "none";
          (
            document.querySelector(".profile__block-avatar") as HTMLElement
          ).style.display = "none";
          btnChangePass.hide();
          btnChangeData.hide();
          changeData.show();
        },
      },
    });

    const btnChangePass = new Button({
      className: "button",
      label: "Изменить пароль",
      events: {
        click: (e: Event) => {
          e.preventDefault();
          (
            document.querySelector(".profile__block") as HTMLElement
          ).style.display = "none";
          (
            document.querySelector(".profile__block-avatar") as HTMLElement
          ).style.display = "none";
          btnChangePass.hide();
          btnChangeData.hide();
          changePass.show();
        },
      },
    });

    const changeData = new Form({
      formInputs: infoForm(store.getState().user),
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
              (
                document.querySelector(".profile__block") as HTMLElement
              ).style.display = "flex";
              (
                document.querySelector(".profile__block-avatar") as HTMLElement
              ).style.display = "flex";
              btnChangePass.show();
              btnChangeData.show();
              changeData.hide();
            },
          },
        },
      ],
      events: {
        submit: changeUserData
      },
    });

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
              (
                document.querySelector(".profile__block") as HTMLElement
              ).style.display = "flex";
              (
                document.querySelector(".profile__block-avatar") as HTMLElement
              ).style.display = "flex";
              btnChangeData.show();
              btnChangePass.show();
              changePass.hide();
            },
          },
        },
      ],
      events: {
        submit: changePassword
      },
    });

    changeData.hide();
    changePass.hide();

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
      ],
    });

    const avatarOpen = (e: Event): void => {
      if (
        // eslint-disable-next-line no-constant-condition
        (e.target as HTMLElement).id === "avatar"
      ) {
        modal.show();
      }
    };

    const modal = new Modal({ form: formModal });
    super("div", {
      ...props,
      ...store.getState(),
      ...{
        btnChangeData,
        btnChangePass,
        btnLogout,
        modal,
        changeData,
        changePass,
        events: { click: avatarOpen },
      },
    });
    if (isEmpty(store.getState())) {
      auth.getUserInfo();
      chats.getChats();
    }

    store.on(StoreEvents.Updated, () => {
      this.setProps(store.getState());
    });
  }

  render() {
    return this.setTemplate(template, this.props);
  }

  static build() {
    return new Profile();
  }
}
