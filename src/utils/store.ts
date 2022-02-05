import { Props } from "types";
import EventBus from "./EventBus";
import set from "./services/set";

export enum StoreEvents {
  Updated = "updated",
}

class Store extends EventBus {
  private state: Props = {};

  public getState() {
    return this.state;
  }

  public setState(path: string, value: any) {
    set(this.state, path, value);

    this.emit(StoreEvents.Updated);
  }
}

export default new Store();
