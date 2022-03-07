import { formCheck } from "../../utils/events";
import router from "../../utils/router";
import Block from "../../layout/block/index";
import { Props } from "../../layout/block/types";
import Form from "../../components/form";
import { registerForm } from "../../constants/inputs";
import { template } from "./register.tmpl";
import auth from "../../controllers/auth";

export default class Register extends Block {
  constructor(props: Props = {}) {
    const form = new Form({
      formInputs: registerForm,
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
              router.go("/");
            },
          },
        },
      ],
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          const data = formCheck(e);
          if (data) {
            auth.signUp(data);
          }
        },
      },
    });

    super("div", { id: props.id, classname: props.className, form });
  }

  render() {
    return this.setTemplate(template, this.props);
  }
}
