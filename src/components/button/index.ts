import Block from "../../layout/block/index";
import { Props } from "../../layout/block/types";
import "./button.scss";
import template from "./button.tmpl";

export default class Button extends Block {
  constructor(props: Props = {}) {
    super("div", props);
  }
  render() {
    return this.setTemplate(template, this.props);
  }
}
