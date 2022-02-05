import main from "bundle-text:./main.pug";
import simple from "bundle-text:./simple.pug";
import "./main.scss";
import "./simple.scss";
import "../components/button/button.scss";
import "../components/sidebar/sidebar.scss";
import "../components/header/header.scss";
import * as pug from "pug";
import { logotype } from "../constants/logotype";
import { generateavatar } from "../utils/generateavatar";

export default class {
  container: HTMLElement;
  main: HTMLElement;
  page: any;
  title: string;
  constructor(params: any) {
    this.container = document.body;
  }

  updateLayout = async (type: any) => {
    let user = JSON.parse(localStorage.getItem("user") || "{}");
    switch (type) {
      case "main":
        this.page = this.container.querySelector("#main__page");
        if (!this.page) {
          this.container.innerHTML = pug.render(main);
          (this.container.querySelector("#logo") as HTMLElement).innerText =
            logotype;
        }
        if (
          (this.container.querySelector(".header__user-name") as HTMLElement)
            .innerText !== user.display_name
        ) {
          (
            this.container.querySelector(".header__user-avatar") as HTMLElement
          ).innerHTML = "";
          (
            this.container.querySelector(".header__user-avatar") as HTMLElement
          ).append(generateavatar(user, 5));
          (
            this.container.querySelector(".header__user-name") as HTMLElement
          ).innerText = user.display_name;
        }
        break;
      case "simple":
        this.page = this.container.querySelector("#simple__page");
        if (!this.page) {
          this.container.innerHTML = pug.render(simple);
          (
            document.body.querySelector(
              ".simple__page-content-item-title"
            ) as HTMLElement
          ).innerText = logotype;
        }
        break;
      default:
        console.log("Не указан тип шаблона страницы!");
    }
  };

  setTitle = (title: string) => {
    document.title = title;
  };

  renderContent = (content: string) => {
    this.main.innerHTML = pug.render(content);
  };
}
