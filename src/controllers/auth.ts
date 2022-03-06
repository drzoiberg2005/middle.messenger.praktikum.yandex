
import AuthApi from "../API/auth";
import store from "../constants/store";
import { BodyRequest } from "../layout/block/types";
import router from "../utils/router";
import chats from "./chats";

class AuthController {
  private authAPIInstance: AuthApi;

  public constructor() {
    this.authAPIInstance = new AuthApi();
  }

  public signUp(data: BodyRequest) {
    this.authAPIInstance
      .signUp(data)
      .then((xhr: XMLHttpRequest) => {
        if (xhr.status === 200) {
          router.go("/messenger");
        } else {
          const warning = document.querySelector(".form__warning-message");
          if (warning) {
            warning.textContent = "Не удалось зарегистрироваться";
          }
          throw new Error(xhr?.response?.reason);
        }
      })
      .catch((error: { message: string }) => {
        throw new Error(error.message);
      });
  }

  public signIn(data: BodyRequest) {
    this.authAPIInstance
      .signIn(data)
      .then((xhr: XMLHttpRequest) => {
        if (xhr.status === 200) {
          this.getUserInfo();
          chats.getChats();
          router.go("/messenger");
        } else {
          const warning = document.querySelector(".form__warning-message");
          if (warning) {
            warning.textContent = "Не удалось авторизоваться";
          }
          throw new Error(xhr?.response?.reason);
        }
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }

  public getUserInfo() {
    this.authAPIInstance
      .getUserInfo()
      .then((xhr: XMLHttpRequest) => {
        if (xhr.status !== 200) {
          router.go("/");
        } else {
          store.setState("user", xhr.response);
        }
      })
      .catch((error: { message: string }) => {
        throw new Error(error.message);
      });
  }

  public logout() {
    this.authAPIInstance
      .logout()
      .then(() => {
        router.go("/");
      })
      .catch((error: { message: string }) => {
        throw new Error(error.message);
      });
  }
}

export default new AuthController();
