import { requestUser } from "../src/utils/requestuser";
import "./fonts.scss";
import "./index.scss";
import { navigateTo, router } from "./router";

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", async () => {
  document.body.addEventListener("click", (e) => {
    if ((e.target as Element).matches("[data-link]")) {
      e.preventDefault();
      navigateTo((e.target as Element).getAttribute("data-link"));
    }
  });
  router();
});
