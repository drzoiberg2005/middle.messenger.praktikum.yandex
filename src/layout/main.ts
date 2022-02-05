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

    const modal = new Modal({ ...props, form: props.modalForm });

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
    super("div", { ...props, header, sidebar, modal, main });
  }
  render() {
    return this.setTemplate(template, this.props);
  }
}
