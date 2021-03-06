import { v4 as makeUUID } from "uuid";
import EventBus from "../../utils/EventBus";
import { Events, Props, Children } from "./types";

abstract class Block {
  private EVENTS: Events = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_CWU: "flow:component-will-unmount",
    FLOW_RENDER: "flow:render",
  };

  private element: HTMLElement;

  private tagName: string;

  protected eventBus: EventBus;

  protected props: Props;

  protected children: Children;

  protected id: string;

  public constructor(tagName: string = "div", propsAndChildren: Props = {}) {
    this.tagName = tagName;
    this.id = makeUUID();

    const { children, props } = this.getChildren(propsAndChildren);
    this.children = children;

    this.props = this.makePropsProxy({ ...props, id: this.id });

    this.eventBus = new EventBus();
    this.registerEvent();
    this.eventBus.emit(this.EVENTS.INIT);
  }

  public setProps(newProps: Props): void {
    if (!newProps) return;
    Object.assign(this.props, newProps);
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  public deleteElement(): void {
    this.eventBus.emit(this.EVENTS.FLOW_CWU);
  }

  public show() {
    this.getElement().style.display = "flex";
  }

  public hide() {
    this.getElement().style.display = "none";
  }

  public dispatchComponentDidMount(): void {
    this.eventBus.emit(this.EVENTS.FLOW_CDM);
  }

  public abstract render(): DocumentFragment;

  private componentDidMount(): void {
    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((innerChild: Children) => {
          Object.values(innerChild).forEach((child) => {
            child.dispatchComponentDidMount();
          });
        });
      } else {
        child.dispatchComponentDidMount();
      }
    });
  }

  private componentDidUpdated(): void {
    this.removeEvents();
    this.eventBus.emit(this.EVENTS.FLOW_RENDER);
  }

  private componentDidUnmounted(): void {
    this.removeEvents();

    this.element.remove();
  }

  private renderComponent(): void {
    const fragment = this.render();
    const element = fragment.firstElementChild as HTMLElement;
    this.element.replaceWith(element);
    this.element = element;
    this.addEvents();
  }

  private makePropsProxy(props: Props): Props {
    const proxySetting = {
      get: (target: Props, prop: string): unknown => target[prop],

      set: (target: Props, prop: string, value: unknown): boolean => {
        const oldProps = target[prop];
        // eslint-disable-next-line no-param-reassign
        target[prop] = value;
        this.eventBus.emit(this.EVENTS.FLOW_CDU, oldProps, target[prop]);
        return true;
      },

      deleteProperty: (target: Props, prop: string): boolean => {
        const oldProps = target[prop];
        // eslint-disable-next-line no-param-reassign
        delete target[prop];

        this.eventBus.emit(this.EVENTS.FLOW_CDU, oldProps, target[prop]);
        return true;
      },
    };

    return new Proxy(props, proxySetting);
  }

  private registerEvent(): void {
    this.eventBus.on(this.EVENTS.INIT, this.init.bind(this));
    this.eventBus.on(this.EVENTS.FLOW_CDM, this.componentDidMount.bind(this));
    this.eventBus.on(this.EVENTS.FLOW_CDU, this.componentDidUpdated.bind(this));
    this.eventBus.on(
      this.EVENTS.FLOW_CWU,
      this.componentDidUnmounted.bind(this)
    );
    this.eventBus.on(this.EVENTS.FLOW_RENDER, this.renderComponent.bind(this));
  }

  private init(): void {
    this.createResources();
    this.eventBus.emit(this.EVENTS.FLOW_RENDER);
  }

  private createResources(): void {
    this.element = this.createDocumentElement(this.tagName);
  }

  // eslint-disable-next-line class-methods-use-this
  private createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }

  private addEvents(): void {
    const { events } = this.props;

    if (events) {
      Object.keys(events).forEach((eventName) => {
        this.element.addEventListener(eventName, events[eventName], true);
      });
    }
  }

  private removeEvents(): void {
    const { events } = this.props;

    if (events) {
      Object.keys(events).forEach((eventName) => {
        this.element.addEventListener(eventName, events[eventName]);
      });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private getChildren(propsAndChildren: Props) {
    const children: Record<string, Block> | any = {};
    const props: Props = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (
        value instanceof Block ||
        (Array.isArray(value) && Object.values(value[0] ? value[0] : {} )[0] instanceof Block)
      ) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });
    return { children, props };
  }

  protected setTemplate(template: Function, props: Props) {
    const propsAndStubs = { ...props };
    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child) && Object.values(child[0])[0] instanceof Block) {
        child.forEach((innerChild: Children) => {
          Object.entries(innerChild).forEach(([innerChildKey, child]) => {
            if (!propsAndStubs[key]) {
              propsAndStubs[key] = [];
            }
            propsAndStubs[key].push({
              [innerChildKey]: `<div data-id="${child.id}"></div>`,
            });
          });
        });
      } else {
        propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
      }
    });

    const fragment = this.createDocumentElement(
      "template"
    ) as HTMLTemplateElement;
    fragment.innerHTML = template(propsAndStubs);
    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child) && Object.values(child[0])[0] instanceof Block) {
        child.forEach((innerChild: Children) => {
          // eslint-disable-next-line no-unused-vars
          Object.entries(innerChild).forEach(([innerChildKey, child]) => {
            console.log(innerChildKey)
            const stub = fragment.content.querySelector(
              `[data-id="${child.id}"]`
            );
            (stub as HTMLElement).replaceWith(child.getElement());
          });
        });
      } else {
        const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);
        (stub as HTMLElement).replaceWith(child.getElement());
      }
    });

    return fragment.content;
  }
}

export default Block;
