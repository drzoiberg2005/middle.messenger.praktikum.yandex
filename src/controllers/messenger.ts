/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */
import store from "../constants/store";
import { Props } from "../layout/block/types";
import Socket from "../utils/socket";
import chats from "./chats";
import users from "./users";

class MessengerController {
  public pageClick(e: Event): void {
    const { value } = (e.target as HTMLElement).dataset;
    if (value === "messageForm") {
      e.preventDefault();
      const { id } = store.getState().currentChats;
      const sockets = store.getState().socket;
      let socket: Socket;
      const input = document.querySelector(
        '[data-value="messageInput"]'
      ) as HTMLInputElement;

      Object.entries(sockets).forEach(([key, value]) => {
        if (key === id) {
          socket = value as Socket;
          socket.send({
            content: input?.value,
            type: "message",
          });
        }
      });
      input.value = "";
    }

    if (value === "AddChatForm") {
      const input = document.querySelector(
        '[data-value="AddInput"]'
      ) as HTMLInputElement;
      chats.createChat({
        title: input.value,
      });
      input.value = "";
    }

    if (value === "AddUserForm") {
      const input = document.querySelector(
        '[data-value="AddInput"]'
      ) as HTMLInputElement;
      if (input.value && store.getState().currentChats) {
        chats.addUserToChat({
          login: input.value,
        });
        input.value = "";
      }
    }

    const chatTarget = (e.target as HTMLElement).closest(
      '[data-value="chats"]'
    ) as HTMLElement;
    if (chatTarget) {
      if (chatTarget.dataset.value === "chats") {
        const { id } = chatTarget.dataset;

        chatTarget.classList.add("__active");

        let socket: Socket;
        const sockets = store.getState().socket;
        Object.entries(sockets).forEach(([key, value]) => {
          if (key === id) {
            socket = value as Socket;

            socket.send({
              content: "0",
              type: "get old",
            });
          }
        });
        store.setState("currentChats", { id });
      }
    }
  }

  public messageListener() {
    const data = JSON.parse((event as MessageEvent).data);

    if (data.type === "message") {
      this.addMessage(data);
    }

    if (Array.isArray(data)) {
      this.addMessages(data);
    }
  }

  private addMessages(data: Props[]) {
    const prepareMessages: {
      message: Props;
      avatar: string;
      name: string;
    }[] = [];

    data.forEach((message) => {
      users
        .getUserById(message.user_id)
        .then((xhr: XMLHttpRequest) => {
          const {
            avatar,
            display_name = xhr.response.display_name
              ? xhr.response.display_name
              : `${xhr.response.first_name} ${xhr.response.second_name}`,
          } = xhr.response;

          prepareMessages.push({
            name: display_name,
            avatar,
            message,
          });
        })
        .then(() => {
          if (prepareMessages.length === data.length) {
            store.setState("messages", prepareMessages);
          }
        });
    });
  }

  private addMessage(message: {
    message: Props;
    avatar: string;
    name: string;
    user_id: string;
  }) {
    const messagesArray = store.getState().messages;

    users
      .getUserById(message.user_id)
      .then((xhr: XMLHttpRequest) => {
        const {
          avatar,
          display_name = xhr.response.display_name
            ? xhr.response.display_name
            : `${xhr.response.first_name} ${xhr.response.second_name}`,
        } = xhr.response;

        messagesArray.unshift({
          name: display_name,
          avatar,
          message,
        });
      })
      .then(() => {
        store.setState("messages", messagesArray);
      });
  }
}

export default new MessengerController();
