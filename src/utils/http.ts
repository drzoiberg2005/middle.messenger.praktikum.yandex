import { navigateTo } from "../../static/router";

const fetch = async (
  url: any,
  method = "GET",
  body: { [x: string]: string } | null = null,
  headers?: { [x: string]: string }
): Promise<any> => {
  const response = new Promise(function (resolve, reject) {
    const http = new XMLHttpRequest();
    const fullUrl = `https://ya-praktikum.tech/api/v2${url}`;
    http.open(method, fullUrl, true);
    http.setRequestHeader("accept", "application/json");
    if (body) {
      http.setRequestHeader("Content-Type", "application/json");
    }
    for (let key in headers) {
      http.setRequestHeader(key, headers[key]);
    }
    http.withCredentials = true;
    http.responseType = "json";
    http.onload = function () {
      if (http.readyState === 4) {
        resolve({
          status: http.status,
          response: http.response,
        });
      }
    };
    http.send(JSON.stringify(body));
  });
  return response;
};

export const useHttp = async (
  url: string,
  method?: string,
  body?: { [x: string]: string } | null,
  headers?: undefined
) => {
  try {
    const data = await fetch(url, method, body, headers);
    return data;
  } catch (error) {
    navigateTo("/500");
    console.log(error);
  }
};
