import { BodyRequest, Options } from "src/layout/block/types";
import Main from "./main";

export default class Auth extends Main {
  
  public signUp(data: BodyRequest) {
    const options: Options = {
      method: "POST",
      credentials: true,
      headers: {
        "content-type": "application/json",
      },
      body: data,
    };
    return this.http.post(`${this.baseUrl}/auth/signup`, options);
  }

  public signIn(data: BodyRequest) {
    const options: Options = {
      method: "POST",
      credentials: true,
      headers: {
        "content-type": "application/json",
      },
      body: data,
    };

    return this.http.post(`${this.baseUrl}/auth/signin`, options);
  }

  public getUserInfo() {
    const options: Options = {
      method: "GET",
      credentials: true,
    };

    return this.http.get(`${this.baseUrl}/auth/user`, options);
  }

  public logout() {
    const options: Options = {
      method: "POST",
      credentials: true,
      body: {},
    };

    return this.http.post(`${this.baseUrl}/auth/logout`, options);
  }
}
