/* eslint-disable no-unused-vars */

import { set } from "../utils/helpers";
import { Props } from "../layout/block/types";
import EventBus from "../utils/EventBus";

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
