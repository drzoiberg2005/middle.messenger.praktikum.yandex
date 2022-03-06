import { Props } from "src/layout/block/types";
import Block from "../../layout/block/index";
import { template } from "./profile.tmpl";
import "./profile.scss";
import Button from "../../components/button";
import Modal from "../../components/modal";
import Form from "../../components/form";
import { fileForm, infoForm, passwordForm } from "../../constants/inputs";
import store, { StoreEvents } from "../../constants/store";
import { formCheck } from "../../utils/events";
import auth from "../../controllers/auth";
import { isEmpty } from "../../utils/helpers";
import chats from "../../controllers/chats";
import router from "../../utils/router";
import users from "../../controllers/users";

export default class Profile extends Block {
  constructor(props: Props = {}) {
    if (props.user === "undefined") {
      throw new Error("Cannot be called directly");
    }

    const hideOrShowInfo = (element: Form) => {
      const infoBlock = document.querySelector(
        ".profile__block"
      ) as HTMLElement;
      const avatarBlock = document.querySelector(
        ".profile__block-avatar"
      ) as HTMLElement;
      if (infoBlock && avatarBlock) {
        if (infoBlock.classList.contains("__hide") === false) {
          btnChangePass.hide();
          btnChangeData.hide();
          element.show();
        } else {
          btnChangePass.show();
          btnChangeData.show();
          element.hide();
        }
        infoBlock.classList.toggle("__hide");
        avatarBlock.classList.toggle("__hide");
      }
    };

    const btnLogout = new Button({
      className: "button __cancel",
      label: "Выйти из профиля",
      events: {
        click: (e: Event) => {
          e.preventDefault();
          auth.logout();
          router.go("/");
        },
      },
    });

    const btnChangeData = new Button({
      className: "button",
      label: "Изменить данные",
      events: {
        click: (e: Event) => {
          e.preventDefault();
          hideOrShowInfo(changeData);
        },
      },
    });

    const btnChangePass = new Button({
      className: "button",
      label: "Изменить пароль",
      events: {
        click: (e: Event) => {
          e.preventDefault();
          hideOrShowInfo(changePass);
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
              hideOrShowInfo(changeData);
            },
          },
        },
      ],
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          const data = formCheck(e);
          if (data) {
            users.changeUserProfile(e, data);
          }
        },
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
              hideOrShowInfo(changePass);
            },
          },
        },
      ],
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          const data = formCheck(e);
          if (data) {
            users.changeUserPassword(e, data);
          }
        },
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

    const modal = new Modal({ form: formModal, label: "Выбрать аватар" });
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
