/* eslint-disable no-unused-vars */
type Options = {
  timeout?: number;
  method: string;
  headers?: Record<string, string>;
  data?: Record<string, any>;
  params?: Record<string, any>;
};

enum METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export default class HTTPTransport {
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

  private request = (url: string, options: Options, timeout = 5000) => {
    const { headers = {}, method, data, params } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(method, params ? `${url}${this.queryStringify(params)}` : url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.timeout = timeout;

      xhr.onload = () => resolve(xhr);
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (isGet) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
