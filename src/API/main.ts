import HTTPTransport from "../utils/HTTPTransport";

export default class MainApi {
  protected http;

  protected baseUrl: string;

  public constructor() {
    this.http = new HTTPTransport();
    this.baseUrl = "https://ya-praktikum.tech/api/v2";
  }
}
