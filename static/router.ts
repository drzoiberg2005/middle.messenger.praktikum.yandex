import render from "../src/utils/renderDom";
import Simple from "../src/layout/simple";
import Main from "../src/layout/main";

const pathtoRegex = (path: string) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = (match: { [k: string]: any }) => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    (result: string) => result[1]
  );

  return Object.fromEntries(
    keys.map((key, index) => {
      return [key, values[index]];
    })
  );
};

export const navigateTo = (url: string) => {
  history.pushState(null, document.title, url);
  router();
};

function get_cookie(name?: string) {
  return document.cookie.split(";").some((c) => {
    return c.trim().startsWith(name + "=");
  });
}
export const router = async () => {
  console.log(get_cookie());
  const routes = [
    {
      path: "/profile",
      layout: Main,
      page: "Профиль",
    },
    {
      path: "/chat",
      layout: Main,
      page: "Чат",
    },
    {
      path: "/",
      layout: Simple,
      page: "Авторизация",
    },
    {
      path: "/register",
      layout: Simple,
      page: "Регистрация",
    },
    {
      path: "/500",
      layout: Simple,
      page: "500",
    },
    {
      path: "/404",
      layout: Simple,
      page: "404",
    },
  ];

  const variableMatches = routes.map((route) => {
    return {
      route: route,
      result: location.pathname.match(pathtoRegex(route.path)),
    };
  });

  let match = variableMatches.find((varMatch) => varMatch.result !== null);
  if (!match) {
    match = {
      route: routes[routes.length - 1],
      result: [location.pathname],
    };
  }
  document.body.innerHTML = "";
  console.log(match);
  
  render(
    "body",
    new match.route.layout({page: match.route.page})
  );
};
