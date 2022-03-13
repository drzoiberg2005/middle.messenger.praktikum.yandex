import UserApi from "../API/users";
import store from "../constants/store";
import { BodyRequest } from "../layout/block/types";

class UserController {
  private usersAPIInstance: UserApi;

  public constructor() {
    this.usersAPIInstance = new UserApi();
  }

  public changeUserAvatar(data: FormData) {
    this.usersAPIInstance
      .changeUserAvatar(data)
      .then((xhr: XMLHttpRequest) => store.setState("user", xhr.response))
      .catch((error) => {
        throw new Error(error.message);
      });
  }

  public changeUserProfile(e: Event, data: BodyRequest) {
    const warning = (e.currentTarget as HTMLElement).querySelector(
      ".form__warning-message"
    ) as HTMLElement;
    this.usersAPIInstance
      .changeUserProfile(data)
      .then((xhr: XMLHttpRequest) => {
        if (xhr.status === 200) {
          warning.classList.add("__success")
          warning.innerText = "Профиль обновлен";
        } else {
          warning.classList.remove("__success")
          warning.innerText = "Профиль не удалось обновить";
        }
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }

  public changeUserPassword(e: Event, data: BodyRequest) {
    const warning = (e.currentTarget as HTMLElement).querySelector(
      ".form__warning-message"
    ) as HTMLElement;
    this.usersAPIInstance
      .changeUserPassword(data)
      .then((xhr: XMLHttpRequest) => {
        if (xhr.status === 200) {
          warning.classList.add("__success")
          warning.innerText = "Пароль обновлен";
        } else {
          warning.classList.remove("__success")
          warning.innerText = "Пароль не удалось обновить";
        }
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }

  public getUserById(id: string) {
    return this.usersAPIInstance.getUserById(id);
  }

  public findUsersByLogin(data: BodyRequest) {
    return this.usersAPIInstance.findUsers(data);
  }
}

export default new UserController();
