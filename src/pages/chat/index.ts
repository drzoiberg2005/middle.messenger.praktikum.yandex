import Block from "../../layout/block/index";
import { Props } from "../../layout/block/types";
import { template } from "./chat.tmpl";
import "./chat.scss";
import Button from "../../components/button";
import templateDialog from "./components/list.tmpl";
import templateMessage from "./components/messages.tmpl";
import { chats, messages } from "../../../static/consts";
import { formSubmit } from "../../utils/events";
import paperclip from "../../../static/icons/paperclip.svg";
import message from "../../../static/icons/message.svg";
import { fileForm, sendForm } from "../../constants/inputs";
import Form from "../../components/form";

export default class Chat extends Block {
  constructor(props: Props = {}) {
    const dialogs = chats;
    const currentDialog = messages;

    const listDialogs = dialogs.map(
      (element: {
        contact: string;
        message: string;
        time: string;
        counter: string;
      }) => {
        return {
          button: new Button({
            class: "list__item",
            label: templateDialog(element),
            events: {
              click: () => this.setProps({ class: "list__item __active" }),
            },
          }),
        };
      }
    );

    const listMessages = currentDialog.map(
      (element: { message: string; in: boolean }) => {
        return {
          button: new Button({
            label: templateMessage(element),
            events: {},
          }),
        };
      }
    );

    const send = new Form({
      formInputs: sendForm,
      warning: "",
      class:"shipment",
      formButtons: [
        {
          label: `<img src='${message}'/>`,
          class: "icon",
          type: "submit",
        },
      ],
      events: {
        submit: formSubmit,
      },
    });

    super("div", { ...props, listDialogs, listMessages, send });
  }

  render() {
    return this.setTemplate(template, this.props);
  }
}
