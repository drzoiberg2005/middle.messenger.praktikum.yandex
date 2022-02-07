import Block from "../../layout/block/index";
import { Props } from "../../layout/block/types";
import Form from "../../components/form";
import { registerForm } from "../../constants/inputs";
import { navigateTo } from "../../../static/router";
import { template } from "./register.tmpl";
import { formSubmit } from "../../utils/events";

export default class Register extends Block {
  constructor(props: Props = {}) {
    const form = new Form({
      formInputs: registerForm,
      warning: "",
      formButtons: [
        {
          label: "Зарегистрироваться",
          className: "button",
          type: "submit",
        },
        {
          label: "Войти",
          className: "button __invert",
          type: "cancel",
          events: {
            click: (e: Event) => {
              e.preventDefault();
              navigateTo("/");
            },
          },
        },
      ],
      events: {
        submit: formSubmit,
      },
    });

    super("div", { id: props.id, classname: props.className, form });
  }

  render() {
    return this.setTemplate(template, this.props);
  }
}
