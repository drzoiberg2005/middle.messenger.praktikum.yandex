import Block from "../../layout/block/index";
import { Props } from "../../layout/block/types";
import Form from "../../components/form";
import { authForm } from "../../constants/inputs";
import { navigateTo } from "../../../static/router";
import { template } from "./register.tmpl";
import { formSubmit } from "../../utils/events";

export default class Auth extends Block {
  constructor(props: Props = {}) {
    const form = new Form({
      title: "FORM",
      formInputs: authForm,
      warning: "",
      formButtons: [
        {
          label: "Войти",
          class: "button",
          type: "submit",
        },
        {
          label: "Зарегистрироваться",
          class: "button __invert",
          events: {
            click: (e: Event) => {
              e.preventDefault();
              navigateTo("/register");
            },
          },
        },
      ],
      events: {
        submit: formSubmit
      },
    });

    super("div", { ...props, form });
  }

  render() {
    return this.setTemplate(template, this.props);
  }
}
