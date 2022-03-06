import router from "../../utils/router";
import Block from "../../layout/block/index";
import { Props } from "../../layout/block/types";
import Form from "../../components/form";
import { authForm } from "../../constants/inputs";
import { template } from "./auth.tmpl";
import { formCheck } from "../../utils/events";
import auth from "../../controllers/auth";

export default class Auth extends Block {
  constructor(props: Props = {}) {
    console.log(document.cookie);
    
    const form = new Form({
      formInputs: authForm,
      formButtons: [
        {
          label: "Войти",
          className: "button",
          type: "submit",
        },
        {
          label: "Зарегистрироваться",
          className: "button __invert",
          events: {
            click: (e: Event) => {
              e.preventDefault();
              router.go("/sign-up");
            },
          },
        },
      ],
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          const data = formCheck(e);
          if (data) {
            auth.signIn(data);
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
