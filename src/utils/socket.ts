import { Props } from "../layout/block/types";

export default class Socket {
  private ping: number = 30000;

  private socket: WebSocket;

  private token: string;

  private chatId: string;

  private userId: string;

  private baseUrl: string = "wss://ya-praktikum.tech/ws/chats";

  public constructor(userId: string, chatId: string, token: string) {
    this.userId = userId;
    this.chatId = chatId;
    this.token = token;

    this.socket = new WebSocket(
      `${this.baseUrl}/${this.userId}/${this.chatId}/${this.token}`
    );
    this.open();
  }

  public message(fn: Function) {
    this.socket.addEventListener("message", () => {
      fn();
    });
  }

  public send(obj: Props) {
    this.socket.send(JSON.stringify(obj));
  }

  public getSocket() {
    return this.socket;
  }

  private open() {
    this.socket.addEventListener("open", () => {
      this.pingPong();
    });
  }

  private pingPong() {
    setInterval(() => {
      this.send({ type: "ping" });
    }, this.ping);
  }
}
