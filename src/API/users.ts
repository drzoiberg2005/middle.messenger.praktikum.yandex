import { BodyRequest, Options } from "src/layout/block/types";
import MainApi from "./main";

export default class UserApi extends MainApi {

  public changeUserProfile(data: BodyRequest) {
    const options: Options = {
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
      credentials: true,
      data,
    };

    return this.http.put(`${this.baseUrl}/user/profile/avatar`, options);
  }

  public changeUserPassword(data: BodyRequest) {
    const options: Options = {
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
      credentials: true,
      headers: {
        "content-type": "application/json",
      },
      body: data,
    };

    return this.http.post(`${this.baseUrl}/user/search`, options);
  }
}
