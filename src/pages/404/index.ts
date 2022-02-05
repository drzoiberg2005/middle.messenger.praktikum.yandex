import Button from "../../components/button";
import { Props } from "../../layout/block/types";
import { navigateTo } from "../../../static/router";
import template from "./404.tmpl";
import Block from "../../layout/block";

export default class Page404 extends Block {
  constructor(props: Props = {}) {
    const button = new Button({
      label: "На главную",
      class: "button",
      events: { click: () => navigateTo("/") },
    });

    super("div", { ...props, button });
  }

  render() {
    return this.setTemplate(template, this.props);
  }
}
