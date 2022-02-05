import Block from "../../layout/block/index";
import { Props } from "../../layout/block/types";
import template from "./input.tmpl";
import inputFieldTMPL from "./inputField.tmpl"
import "./input.scss";

export default class Input extends Block {
  constructor(props: Props = {}) {
    const inputFld = new InputField(props)
    super("div", { ...props, inputFld });
  }
  render() {
    return this.setTemplate(template, this.props);
  }
}

class InputField extends Block {
  constructor(props: Props = {}) {
    super("div", props);
  }
  render() {
    return this.setTemplate(inputFieldTMPL, this.props);
  }
}
