import Button from "../../components/button";
import { Props } from "../../layout/block/types";
import { navigateTo } from "../../../static/router";
import template from "./500.tmpl";
import Block from "../../layout/block";

export default class Page500 extends Block {
  constructor(props: Props = {}) {
    const button = new Button({
      label: "На главную",
      className: "button",
      events: { click: () => navigateTo("/") },
    });

    super("div", { id: props.id, classname: props.className, button });
  }

  render() {
    return this.setTemplate(template, this.props);
  }
}
