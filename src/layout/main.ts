import Block from "./block/index";
import { Props } from "./block/types";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import "./main.scss";
import template from "./main.tmpl";
import Profile from "../pages/profile";
import Chat from "../pages/chat";
import { isEmpty } from "../utils/helpers";
import store, { StoreEvents } from "../constants/store";
import chats from "../controllers/chats";
import auth from "../controllers/auth";

export default class Main extends Block {
  constructor(props: Props = {}) {
    const header = new Header(props);

    const sidebar = new Sidebar(props);

    // eslint-disable-next-line consistent-return
    const selectComponent = () => {
      switch (props.page) {
        case "Чат":
          return new Chat(store.getState());

        case "Профиль":
          return new Profile(store.getState());

        default:
          break;
      }
    };
    const main = selectComponent();

    super("div", {
      ...props,
      ...{ header, sidebar, main },
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
