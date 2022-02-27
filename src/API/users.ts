import { BodyRequest, Options } from "src/layout/block/types";
import Main from "./main";

export default class User extends Main {

  public changeUserProfile(data: BodyRequest) {
    const options: Options = {
      method: "PUT",
      credentials: true,
      headers: {
        "content-type": "application/json",
      },
      body: data,
    };

    return this.http.put(`${this.baseUrl}/user/profile`, options);
  }

  public changeUserAvatar(data: FormData) {
    const options: Options = {
      method: "PUT",
      credentials: true,
      data,
    };

    return this.http.put(`${this.baseUrl}/user/profile/avatar`, options);
  }

  public changeUserPassword(data: BodyRequest) {
    const options: Options = {
      method: "PUT",
      credentials: true,
      headers: {
        "content-type": "application/json",
      },
      body: data,
    };

    return this.http.put(`${this.baseUrl}/user/password`, options);
  }

  public getUserById(id: string) {
    const options: Options = {
      method: "GET",
      credentials: true,
      headers: {
        "content-type": "application/json",
      },
      data: { id },
    };

    return this.http.get(`${this.baseUrl}/user/${id}`, options);
  }

  public findUsers(data: BodyRequest) {
    const options: Options = {
      method: "POST",
      credentials: true,
      headers: {
        "content-type": "application/json",
      },
      body: data,
    };

    return this.http.post(`${this.baseUrl}/user/search`, options);
  }
}
