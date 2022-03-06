import { BodyRequest, Options } from "src/layout/block/types";
import MainApi from "./main";

export default class ChatsApi extends MainApi {

  public getChats(data: BodyRequest) {
    const options: Options = {
      credentials: true,
      headers: {
        "content-type": "application/json",
      },
      data,
    };

    return this.http.get(`${this.baseUrl}/chats`, options);
  }

  public createChat(data: BodyRequest) {
    const options: Options = {
      credentials: true,
      headers: {
        "content-type": "application/json",
      },
      body: data,
    };

    return this.http.post(`${this.baseUrl}/chats`, options);
  }

  public addUserToChat(data: BodyRequest) {
    const options: Options = {
      credentials: true,
      headers: {
        "content-type": "application/json",
      },
      body: data,
    };

    return this.http.put(`${this.baseUrl}/chats/users`, options);
  }

  public deleteUserFromChat(data: BodyRequest) {
    const options: Options = {
      credentials: true,
      headers: {
        "content-type": "application/json",
      },
      body: data,
    };

    return this.http.delete(`${this.baseUrl}/chats/users`, options);
  }

  public getChatToken(id: string) {
    const options: Options = {
      credentials: true,
      headers: {
        "content-type": "application/json",
      },
      body: {},
    };

    return this.http.post(`${this.baseUrl}/chats/token/${id}`, options);
  }
}
