import Block from "../layout/block";
import { Props } from "../layout/block/types";
import renderDOM from "./renderDom";

export default class Route {
  private pathname: string;

  private BlockClass: any;

  private block: Block;

  private props: Props;

  constructor(pathname: string, view: any, props: Props) {
    this.pathname = pathname;
    this.BlockClass = view;
    this.props = props;
  }

  public match(pathname: string): boolean {
    return pathname === this.pathname;
  }

  public leave(): void {
    if (this.block) {
      this.block.deleteElement();
    }
  }

  public render(): void {
    this.block = new this.BlockClass(this.props);
    renderDOM("body", this.block);
  }
}
