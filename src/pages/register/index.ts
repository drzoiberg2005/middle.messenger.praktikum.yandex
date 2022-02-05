import Block from "../../layout/block/index";
import { Props } from "../../layout/block/types";
import Form from "../../components/form";
import { registerForm } from "../../constants/inputs";
import { navigateTo } from "../../../static/router";
import { template } from "./register.tmpl";

export default class Register extends Block {
  constructor(props: Props = {}) {
    const form = new Form({
      formInputs: registerForm,
      warning: "",
      formButtons: [
        {
          label: "Зарегистрироваться",
          class: "button",
          type: "submit",
          events: {
            click: (e: Event) => {
              e.preventDefault();
              form.setProps({ warning: "HI" });
            },
          },
        },
        {
          label: "Войти",
          class: "button __invert",
          type: "cancel",
          events: {
            click: (e: Event) => {
              e.preventDefault();
              navigateTo("/");
            },
          },
        },
      ],
    });

    super("div", { ...props, form });
  }

  render() {
    return this.setTemplate(template, this.props);
  }
}
