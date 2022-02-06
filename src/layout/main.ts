import Block from "./block/index";
import { Props } from "./block/types";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import "./main.scss";
import Modal from "../components/modal";
import template from "./main.tmpl";
import Profile from "../pages/profile";
import Chat from "../pages/chat";

export default class Main extends Block {
  constructor(props: Props = {}) {
    const header = new Header(props);

    const sidebar = new Sidebar(props);

    const modal = new Modal({ id: props.id, classname: props.className, form: props.modalForm });

    // eslint-disable-next-line consistent-return
    const selectComponent = () => {
      switch (props.page) {
        case "Чат":
          return new Chat(props);

        case "Профиль":
          return new Profile(props);

        default:
          break;
      }
    };
    const main = selectComponent();
    super("div", { id: props.id, classname: props.className, header, sidebar, modal, main });
  }

  render() {
    return this.setTemplate(template, this.props);
  }
}
