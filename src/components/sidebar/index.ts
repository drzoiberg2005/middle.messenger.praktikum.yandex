import router from "../../utils/router";
import Block from "../../layout/block/index";
import { Props } from "../../layout/block/types";
import template from "./sidebar.tmpl";
import comments from "../../../static/icons/comments.svg";
import user from "../../../static/icons/user.svg";
import "./sidebar.scss";
import Button from "../button";
import { logotype } from "../../constants/logotype";

export default class Sidebar extends Block {
  constructor(props: Props = {}) {
    const buttons = [
      {
        button: new Button({
          label: `<img src=${comments}>`,
          className: `sidebar__menu-item ${
            props.page === "Чат" ? "__active" : ""
          }`,
          events: {
            click: () => {
              router.go("/messenger");
            },
          },
        }),
      },
      {
        button: new Button({
          label: `<img src=${user}>`,
          className: `sidebar__menu-item ${
            props.page === "Профиль" ? "__active" : ""
          }`,
          events: {
            click: () => {
              router.go("/settings");
            },
          },
        }),
      },
    ];

    super("div", { ...props, ...{ buttons, logo: logotype } });
  }

  render() {
    return this.setTemplate(template, this.props);
  }
}
