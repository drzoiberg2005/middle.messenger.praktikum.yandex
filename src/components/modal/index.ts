import Block from "../../layout/block/index";
import { Props } from "../../layout/block/types";
import Button from "../button";
import "./modal.scss";
import template from "./modal.tmpl";

export default class Modal extends Block {
  constructor(props: Props = {}) {
    const closeBtn = new Button({
      label: "Закрыть",
      class: "button __cancel",
      events: {
        click: () => {
          this.hide();
        },
      },
    });
    super("div", { ...props, closeBtn });
  }
  render() {
    return this.setTemplate(template, this.props);
  }
}
