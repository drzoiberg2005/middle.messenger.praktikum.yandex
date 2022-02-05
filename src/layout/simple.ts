import Block from "./block/index";
import { Props } from "./block/types";
import "./simple.scss";
import template from "./simple.tmpl";
import { logotype } from "../constants/logotype";
import Page404 from "../pages/404";
import Page500 from "../pages/500";
import Register from "../pages/register";
import Auth from "../pages/auth";

export default class Simple extends Block {
  constructor(props: Props = {}) {
    const selectComponent = () => {
      switch (props.page) {
        case "404":
          return new Page404({ ...props });

        case "500":
          return new Page500(props);

        case "Авторизация":
          return new Auth(props);

        case "Регистрация":
          return new Register(props);

        default:
          break;
      }
    };

    super("div", { ...props, logo: logotype, main: selectComponent() });
  }

  render() {
    return this.setTemplate(template, this.props);
  }
}
