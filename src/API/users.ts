import { BodyRequest, Options } from "src/layout/block/types";
import HTTPTransport from "../utils/HTTPTransport";

export default class UserApi {
  private http = new HTTPTransport();

  public changeUserProfile(data: BodyRequest) {
    const options: Options = {
      body: data,
    };

    return this.http.put("/user/profile", options);
  }

  public changeUserAvatar(data: FormData) {
    const options: Options = {
      data,
    };

    return this.http.put("/user/profile/avatar", options);
  }

  public changeUserPassword(data: BodyRequest) {
    const options: Options = {
      body: data,
    };

    return this.http.put("/user/password", options);
  }

  public getUserById(id: string) {
    const options: Options = {
      data: { id },
    };

    return this.http.get(`/user/${id}`, options);
  }

  public findUsers(data: BodyRequest) {
    const options: Options = {
      body: data,
    };

    return this.http.post("/user/search", options);
  }
}
