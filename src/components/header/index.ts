import store, { StoreEvents } from "../../constants/store";
import Block from "../../layout/block/index";
import { Props } from "../../layout/block/types";
import template from "./header.tmpl";
import "./header.scss";
import { goProfile } from "../../utils/events";

export default class Header extends Block {
  constructor(props: Props = {}) {
    
    super("div", {
      ...props,
      ...store.getState(),
      events: {
        click: goProfile,
      },
    });
    store.on(StoreEvents.Updated, () => {
      this.setProps(store.getState());
    });
  }

  render() {
    return this.setTemplate(template, this.props);
  }
}
