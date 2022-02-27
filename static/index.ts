import "./fonts.scss";
import "./index.scss";
import router from "../src/utils/router";
import Main from "../src/layout/main";
import Simple from "../src/layout/simple";

router
  .use("/", Simple, { page: "Авторизация" })
  .use("/sign-up", Simple, { page: "Регистрация" })
  .use("/messenger", Main, { page: "Чат" })
  .use("/settings", Main, { page: "Профиль" })
  .use("/500", Simple, { page: "500" })
  .use("/404", Simple, { page: "404" })
  .start();
