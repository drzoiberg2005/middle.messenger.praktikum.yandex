import { Props } from "src/layout/block/types";
import addchat from "../../../static/icons/addchat.svg";
import adduser from "../../../static/icons/user-circle.svg";
import message from "../../../static/icons/message.svg";
import templateDialog from "./components/list.tmpl";
import templateMessage from "./components/messages.tmpl";

export const template = (props: Props) => {
  const { chats, messages, user, currentChats, addChatModal, addUserModal } = props;

  const listChats = chats
    ? chats.map((
      element: {
            id: number;
            title: string;
            last_message: Props;
            unread_count: number;
            avatar: string;
          }) => templateDialog(element)) .join("")
    : "";
  const listMessages = messages
    ? messages.map((
      element: { 
        content: string 
      }) =>templateMessage(element, user?.id)).join("")
    : "";
  return `
              <div class="chat">
              ${addChatModal}
              ${addUserModal}
                  <div class="dialogs">
                      <div class="find">
                      <input data-value="AddInput" class="shipment__input" />
                      <img id="addChatButton" class="icon" src=${addchat}>
                      <img id="addUserButton" class="icon" src=${adduser}>
                      </div>
                      <ul class="list">
                        ${listChats}
                      </ul>
                  </div>
                  <div class="dialog">
                    <ul class="messages">
                    ${listMessages}
                    </ul>
                    ${currentChats? `<div class="shipment">
                    <textarea data-value="messageInput" class="shipment__input"></textarea>
                    <img data-value="messageForm" class="icon" src=${message}>
                    </div>`: ""}
              </div>
                      `;
};
