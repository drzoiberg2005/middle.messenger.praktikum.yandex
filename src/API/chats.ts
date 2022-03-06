import { BodyRequest, Options } from "src/layout/block/types";
import HTTPTransport from "../utils/HTTPTransport";

export default class ChatsApi {
  private http = new HTTPTransport();

  public getChats(data: BodyRequest) {
    const options: Options = {
      data,
    };

    return this.http.get("/chats", options);
  }

  public createChat(data: BodyRequest) {
    const options: Options = {
      body: data,
    };

    return this.http.post("/chats", options);
  }

  public addUserToChat(data: BodyRequest) {
    const options: Options = {
      body: data,
    };

    return this.http.put("/chats/users", options);
  }

  public deleteUserFromChat(data: BodyRequest) {
    const options: Options = {
      body: data,
    };

    return this.http.delete("/chats/users", options);
  }

  public getChatToken(id: string) {
    const options: Options = {
      body: {},
    };

    return this.http.post(`/chats/token/${id}`, options);
  }
}
