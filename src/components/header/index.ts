import Block from "../../layout/block/index";
import { Props } from "../../layout/block/types";
import template from "./header.tmpl";
import "./header.scss";
import Button from "../button";
import { generateAvatar } from "../../utils/generateAvatar";
import { user } from "../../constants/logotype";
import { navigateTo } from "../../../static/router";

export default class Header extends Block {
  constructor(props: Props = {}) {
    const avatar = generateAvatar(user, 6).outerHTML;
    const button = new Button({
      label: `
      <div class="header__user-avatar">${avatar}</div>
      <span class="header__user-name">${user.display_name}</span>
  `,
      className: "header__user",
      events: { click: () => navigateTo("/profile") },
    });
    super("div", { id: props.id, button, title: props.page });
  }

  render() {
    return this.setTemplate(template, this.props);
  }
}
