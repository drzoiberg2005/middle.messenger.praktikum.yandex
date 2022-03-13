import { Props } from "src/layout/block/types";
import addchat from "../../../static/icons/addchat.svg";
import adduser from "../../../static/icons/user-circle.svg";
import message from "../../../static/icons/message.svg";
import templateMessage from "./components/messages.tmpl";
import templateChat from "./components/list.tmpl";

export const template = (props: Props) => {
  const {chats, messages, user, currentChats, addChatModal, addUserModal } = props;
  
  const listChats = chats
    ? chats.map((
      element: { 
      content: string 
    }) =>templateChat(element, currentChats?.id)).join("")
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
                      <img id="addChatButton" class="icon" src=${addchat}>
                      ${currentChats? `<img id="addUserButton" class="icon" src=${adduser}>` : ""}
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
