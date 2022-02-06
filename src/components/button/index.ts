import Block from "../../layout/block/index";
import { ButtonProps } from "../../layout/block/types";
import "./button.scss";
import template from "./button.tmpl";

export default class Button extends Block {
  constructor(props: ButtonProps) {
    super("div", props);
  }

  render() {
    return this.setTemplate(template, this.props);
  }
}
