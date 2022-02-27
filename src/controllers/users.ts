import User from "../API/users";
import store from "../constants/store";
import { BodyRequest } from "../layout/block/types";

class UserController {
  private usersAPIInstance: User;

  public constructor() {
    this.usersAPIInstance = new User();
  }

  public changeUserAvatar(data: FormData) {
    this.usersAPIInstance
      .changeUserAvatar(data)
      .then((xhr: XMLHttpRequest) => store.setState("user", xhr.response))
      .catch((error) => {
        throw new Error(error.message);
      });
  }

  public changeUserProfile(data: BodyRequest) {
    const warning = document.querySelector(".form__warning-message");
    this.usersAPIInstance
      .changeUserProfile(data)
      .then((xhr: XMLHttpRequest) => {
        if (xhr.status === 200) {
          store.setState("user", xhr.response);
          (warning as HTMLElement).innerText = "Профиль обновлен";
        } else {
          (warning as HTMLElement).innerText = "Профиль не удалось обновить";
        }
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }

  public changeUserPassword(data: BodyRequest) {
    const warning = document.querySelector(".form__warning-message");
    this.usersAPIInstance
      .changeUserPassword(data)
      .then((xhr: XMLHttpRequest) => {
        if (xhr.status === 200) {
          store.setState("user.changePassword", new Date());
          (warning as HTMLElement).innerText = "Пароль обновлен";
        } else {
          (warning as HTMLElement).innerText = "Пароль не удалось обновить";
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
