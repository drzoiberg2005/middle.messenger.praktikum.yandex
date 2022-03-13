import { BodyRequest, Options } from "src/layout/block/types";
import HTTPTransport from "../utils/HTTPTransport";

export default class AuthApi {
  private http = new HTTPTransport();

  public signUp(data: BodyRequest) {
    const options: Options = {
      body: data,
    };

    return this.http.post("/auth/signup", options);
  }

  public signIn(data: BodyRequest) {
    const options: Options = {
      body: data,
    };

    return this.http.post("/auth/signin", options);
  }

  public getUserInfo() {
    const options: Options = {};

    return this.http.get("/auth/user", options);
  }

  public logout() {
    const options: Options = {
      body: {},
    };

    return this.http.post("/auth/logout", options);
  }
}
