import Socket from "../utils/socket";
import Chats from "../API/chats";
import store from "../constants/store";
import { BodyRequest, Props } from "../layout/block/types";
import messenger from "./messenger";
import users from "./users";

class ChatsController {
  private chatsAPIInstance: Chats;

  public constructor() {
    this.chatsAPIInstance = new Chats();
  }

  public getChats(data: BodyRequest = {}) {
    this.chatsAPIInstance
      .getChats(data)
      .then((xhr: XMLHttpRequest) => store.setState("chats", xhr.response))
      .then(() => {
        store.getState().chats.forEach((chat: Props) => {
          this.getChatToken(chat.id).then((token: any) => {
            const socket = new Socket(store.getState().user.id, chat.id, token);
            socket.message(() => {
              messenger.messageListener();
            });
            store.setState(`socket.${chat.id}`, socket);
          });
        });
      })
      .catch((error: { message: any; }) => {
        throw new Error(error.message);
      });
  }

  public createChat(data: BodyRequest) {
    this.chatsAPIInstance
      .createChat(data)
      .then(() => this.getChats())
      .catch((error: { message: any; }) => {
        throw new Error(error.message);
      });
  }

  public getChatToken(id: string) {
    return this.chatsAPIInstance
      .getChatToken(id)
      .then((xhr: XMLHttpRequest) => xhr.response.token)
      .catch((error: { message: any; }) => {
        throw new Error(error.message);
      });
  }

  public addUserToChat(data: BodyRequest) {
    users
      .findUsersByLogin(data)
      .then((xhr: XMLHttpRequest) => xhr.response[0])
      .then((response: { id: any; login: any; }) => {
        const data = {
          users: [response.id],
          chatId: store.getState().currentChats.id,
        };
        this.chatsAPIInstance
          .addUserToChat(data)
          .then(() =>
            store.setState(`currentChats.users.${response.login}`, response.id)
          );
      })
      .catch((error: { message: any; }) => {
        throw new Error(error.message);
      });
  }

  public deleteUserFromChat(data: BodyRequest) {
    users
      .findUsersByLogin(data)
      .then((xhr: XMLHttpRequest) => xhr.response[0])
      .then((response: { id: any; login: any; }) => {
        const data = {
          users: [response.id],
          chatId: store.getState().currentChats.id,
        };
        this.chatsAPIInstance
          .deleteUserFromChat(data)
          .then(() =>
            store.setState(`currentChats.users.${response.login}`, response.id)
          );
      })
      .catch((error: { message: any; }) => {
        throw new Error(error.message);
      });
  }
}

export default new ChatsController();
