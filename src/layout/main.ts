import Block from "./block/index";
import { Props } from "./block/types";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import "./main.scss";
import template from "./main.tmpl";
import Profile from "../pages/profile";
import Chat from "../pages/chat";

export default class Main extends Block {
  constructor(props: Props = {}) {
    const header = new Header(props);

    const sidebar = new Sidebar(props);

    // eslint-disable-next-line consistent-return
    const selectComponent = () => {
      switch (props.page) {
        case "Чат":
          return new Chat();

        case "Профиль":
          return new Profile();

        default:
          break;
      }
    };
    const main = selectComponent();

    super("div", {
      ...props,
      ...{ header, sidebar, main },
    });
  }

  render() {
    return this.setTemplate(template, this.props);
  }
}
