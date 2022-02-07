import render from "../src/utils/renderDom";
import Simple from "../src/layout/simple";
import Main from "../src/layout/main";

const pathtoRegex = (path: string) =>
  new RegExp(`^${  path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)")  }$`);


export const navigateTo = (url: string) => {
  history.pushState(null, document.title, url);
  router();
};

export const router = async () => {
  const routes = [
    {
      path: "/profile",
      Layout: Main,
      page: "Профиль",
    },
    {
      path: "/chat",
      Layout: Main,
      page: "Чат",
    },
    {
      path: "/",
      Layout: Simple,
      page: "Авторизация",
    },
    {
      path: "/register",
      Layout: Simple,
      page: "Регистрация",
    },
    {
      path: "/500",
      Layout: Simple,
      page: "500",
    },
    {
      path: "/404",
      Layout: Simple,
      page: "404",
    },
  ];

  const variableMatches = routes.map((route) => ({
    route,
    result: location.pathname.match(pathtoRegex(route.path)),
  }));

  let match = variableMatches.find((varMatch) => varMatch.result !== null);
  if (!match) {
    match = {
      route: routes[routes.length - 1],
      result: [location.pathname],
    };
  }
  document.body.innerHTML = "";
  
  render(
    "body",
    new match.route.Layout({page: match.route.page})
  );
};
