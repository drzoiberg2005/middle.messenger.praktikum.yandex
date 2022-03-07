/* eslint-disable no-unused-vars */
import { Options, Props } from "src/layout/block/types";

enum METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export default class HTTPTransport {
  private baseUrl: string = "https://ya-praktikum.tech/api/v2";

  public setBaseUrl = (url: string) => {
    this.baseUrl = url;
  };

  public get = (url: string, options: Options) =>
    this.request(url, { ...options, method: METHODS.GET }, options.timeout);

  public post = (url: string, options: Options) =>
    this.request(url, { ...options, method: METHODS.POST }, options.timeout);

  public put = (url: string, options: Options) =>
    this.request(url, { ...options, method: METHODS.PUT }, options.timeout);

  public delete = (url: string, options: Options) =>
    this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);

  // eslint-disable-next-line class-methods-use-this
  private queryStringify = (data: Record<string, any>) => {
    if (typeof data !== "object") {
      throw new Error("Тело запроса должно быть объектом");
    }

    const keys = Object.keys(data);

    return keys.reduce(
      (result, key, index) =>
        `${result}${key}=${data[key]}${index < keys.length - 1 ? "&" : ""}`,
      "?"
    );
  };

  private request = (url: string, options: Props, timeout = 5000) => {
    const {
      headers = {
        "content-type": "application/json",
      },
      method,
      credentials = true,
      data,
      body,
    } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(
        method,
        isGet && data
          ? `${this.baseUrl}${url}${this.queryStringify(data)}`
          : this.baseUrl + url
      );

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      if (credentials) {
        xhr.withCredentials = true;
      }

      xhr.responseType = "json";
      xhr.timeout = timeout;

      xhr.onload = () => resolve(xhr);
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (isGet) {
        xhr.send();
      }
      if (body) {
        xhr.send(JSON.stringify(body));
      }
      if (!isGet && data) {
        xhr.send(data as Document);
      }
    });
  };
}
