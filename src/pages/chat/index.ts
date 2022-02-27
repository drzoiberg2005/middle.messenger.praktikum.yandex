import Block from "../../layout/block/index";
import { Props } from "../../layout/block/types";
import { template } from "./chat.tmpl";
import "./chat.scss";
import store, { StoreEvents } from "../../constants/store";
import { isEmpty } from "../../utils/helpers";
import auth from "../../controllers/auth";
import chats from "../../controllers/chats";
import messenger from "../../controllers/messenger";

export default class Chat extends Block {
  constructor(props: Props = {}) {
    if (isEmpty(store.getState())) {
      auth.getUserInfo();
      chats.getChats();
    }

    super("div", {
      ...props,
      ...store.getState(),
      ...{
        events: {
          click: messenger.pageClick,
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
