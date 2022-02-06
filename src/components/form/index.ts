/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import Block from "../../layout/block/index";
import { FormProps } from "../../layout/block/types";
import template from "./form.tmpl";
import "./form.scss";
import Button from "../button";
import Input from "../input";
import { formSubmit, inputBlur, inputFocus } from "../../utils/events";

export default class Form extends Block {
  constructor(props: FormProps) {
    const buttons = props.formButtons.map((element) => ({
      button: new Button({
        type: element.type,
        label: element.label,
        className: element.className,
        events: element.events,
      }),
    }));

    const inputs = props.formInputs.map((element) => ({
      input: new Input({
        type: element.type,
        value: element.value ? element.value : "",
        name: element.name,
        label: element.label,
        suggested: element.suggested,
        className: element.className,
        events: {
          ...element.events,
          focus: inputFocus,
          blur: inputBlur,
        },
      }),
    }));

    super("div", {
      id: props.id,
      buttons,
      inputs,
      className: props.className,
      events: {
        ...props.events,
        submit: formSubmit,
      },
    });
  }

  render() {
    return this.setTemplate(template, this.props);
  }
}
