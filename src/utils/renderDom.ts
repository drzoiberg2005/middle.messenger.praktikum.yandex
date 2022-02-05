import Block from "../layout/block/index";

export default function render(query: string, block: Block) {
  const root = document.querySelector(query) as HTMLElement;
  root.append(block.getElement());
  block.dispatchComponentDidMount();
}
