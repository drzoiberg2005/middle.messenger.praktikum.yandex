import router from "../../utils/router";
import Button from "../../components/button";
import { Props } from "../../layout/block/types";
import template from "./404.tmpl";
import Block from "../../layout/block";

export default class Page404 extends Block {
  constructor(props: Props = {}) {
    const button = new Button({
      label: "На главную",
      className: "button",
      events: { click: () => router.go("/") },
    });

    super("div", { id: props.id, classname: props.className, button });
  }

  render() {
    return this.setTemplate(template, this.props);
  }
}
