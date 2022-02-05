import Block from "../../layout/block/index";
import { Props } from "../../layout/block/types";
import template from "./form.tmpl";
import "./form.scss";
import Button from "../button";
import Input from "../input";
import { inputBlur, inputFocus } from "../../utils/events";

export default class Form extends Block {
  constructor(props: Props = {}) {
    const buttons = props.formButtons.map(
      (element: {
        type: string;
        label: string;
        class: string;
        events: any;
      }) => {
        return {
          button: new Button({
            type: element.type,
            label: element.label,
            class: element.class,
            events: element.events,
          }),
        };
      }
    );

    const inputs = props.formInputs.map(
      (element: {
        type: string;
        value: string;
        name: string;
        label: string;
        suggested: string;
        modifikator: string;
        events: any;
      }) => {
        return {
          input: new Input({
            type: element.type,
            value: element.value ? element.value : "",
            name: element.name,
            label: element.label,
            suggested: element.suggested,
            modifikator: element.modifikator,
            events: {
              ...element.events,
              focus: inputFocus,
              blur: inputBlur,
            },
          }),
        };
      }
    );

    super("div", {
      ...props,
      buttons,
      inputs,
      class: props.class,
    });
  }
  render() {
    return this.setTemplate(template, this.props);
  }
}
