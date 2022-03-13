import Block from "../../layout/block/index";
import { InputProps } from "../../layout/block/types";
import template from "./input.tmpl";
import "./input.scss";

export default class Input extends Block {
  constructor(props: InputProps) {
    super("div", props);
  }

  render() {
    return this.setTemplate(template, this.props);
  }
}
