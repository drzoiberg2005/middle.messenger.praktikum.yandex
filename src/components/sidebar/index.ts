import Block from "../../layout/block/index";
import { Props } from "../../layout/block/types";
import template from "./sidebar.tmpl";
import comments from "../../../static/icons/comments.svg";
import user from "../../../static/icons/user.svg";
import "./sidebar.scss";
import Button from "../button";
import { navigateTo } from "../../../static/router";
import { logotype } from "../../constants/logotype";

export default class Sidebar extends Block {
  constructor(props: Props = {}) {
    const buttons = [
      {
        button: new Button({
          label: `<img src=${comments}>`,
          className: `sidebar__menu-item ${props.page === "Чат" ? "__active" : ""}`,
          events: {
            click: () => {
              navigateTo("/chat");
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
              navigateTo("/profile");
            },
          },
        }),
      },
    ];

    super("div", { id: props.id, classname: props.className, buttons, logo: logotype });
  }

  render() {
    return this.setTemplate(template, this.props);
  }
}
