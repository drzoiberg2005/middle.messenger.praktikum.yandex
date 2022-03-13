import Header from "../components/header";
import Sidebar from "../components/sidebar";
import Modal from "../components/modal";
import Block from "./block";

export default function template(props: {
  id: string;
  modal: Modal;
  sidebar: Sidebar;
  header: Header;
  main: Block;
}) {
  return `
      <div id="${props.id}" class="main__page">
          ${props.sidebar}
          <div class="content">
              ${props.header}
              <main>
              ${props.main}
              </main>
          </div>
      </div>
      `;
}
