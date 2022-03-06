import Block from "../../layout/block/index";
import { Props } from "../../layout/block/types";
import { template } from "./chat.tmpl";
import "./chat.scss";
import store, { StoreEvents } from "../../constants/store";
import { isEmpty } from "../../utils/helpers";
import auth from "../../controllers/auth";
import chats from "../../controllers/chats";
import messenger from "../../controllers/messenger";
import Modal from "../../components/modal";
import { addChatForm, addUserForm } from "../../constants/inputs";
import Form from "../../components/form";

export default class Chat extends Block {
  constructor(props: Props = {}) {
    if (isEmpty(store.getState())) {
      auth.getUserInfo();
      chats.getChats();
    }

    const addChatBlock = new Form({
      formInputs: addChatForm,
      formButtons: [
        {
          label: "Добавить чат",
          className: "button",
          type: "submit",
        },
      ],
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          const target = e.currentTarget;
          const inputField = (target as HTMLElement).querySelector("input");
          chats.createChat({
            title: inputField?.value,
          });
        },
      },
    });

    const addUserBlock = new Form({
      formInputs: addUserForm,
      formButtons: [
        {
          label: "Добавить пользователя",
          className: "button",
          type: "submit",
        },
      ],
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          const target = e.currentTarget;
          const inputField = (target as HTMLElement).querySelector("input");
          chats.addUserToChat({
            login: inputField?.value,
          });
        },
      },
    });

    const addChatModal = new Modal({ form: addChatBlock, label: "Новый чат" });
    const addUserModal = new Modal({
      form: addUserBlock,
      label: "Добавить пользователя в чат",
    });

    const modalOpen = (e: Event): void => {
      if ((e.target as HTMLElement).id === "addChatButton") {
        addChatModal.show();
      } else if ((e.target as HTMLElement).id === "addUserButton") {
        addUserModal.show();
      }
    };

    super("div", {
      ...props,
      ...store.getState(),
      ...{ addChatModal, addUserModal },
      ...{
        events: {
          click: (e: Event) => {
            modalOpen(e);
            messenger.pageClick(e);
          },
        },
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
}
