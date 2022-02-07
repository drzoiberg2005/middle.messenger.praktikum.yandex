import Block from "../../layout/block/index";
import { Props } from "../../layout/block/types";
import { template } from "./chat.tmpl";
import "./chat.scss";
import Button from "../../components/button";
import templateDialog from "./components/list.tmpl";
import templateMessage from "./components/messages.tmpl";
import { chats, messages } from "../../../static/consts";
import { formSubmit } from "../../utils/events";
import message from "../../../static/icons/message.svg";
import { sendForm } from "../../constants/inputs";
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
      }) => ({
        button: new Button({
          className: "list__item",
          label: templateDialog(element),
          events: {
            click: () => this.setProps({ className: "list__item __active" }),
          },
        }),
      })
    );

    const listMessages = currentDialog.map(
      (element: { message: string; in: boolean }) => ({
        button: new Button({
          label: templateMessage(element),
          className: "none",
        }),
      })
    );

    const send = new Form({
      formInputs: sendForm,
      className:"shipment",
      formButtons: [
        {
          label: `<img src='${message}'/>`,
          className: "icon",
          type: "submit",
        },
      ],
      events: {
        submit: formSubmit,
      },
    });

    super("div", { id: props.id, classname: props.className, listDialogs, listMessages, send });
  }

  render() {
    return this.setTemplate(template, this.props);
  }
}
