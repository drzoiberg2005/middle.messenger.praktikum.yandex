import addchat from "../../../static/icons/addchat.svg";
export const template = (props: { [x: string]: any }) => {
  const listDialogs = props.listDialogs
    .map((element: { [k: string]: string }): string => {
      return `<li>${element.button}</li>`;
    })
    .reduce((a: string, b: string) => a + b);

  const listMessages = props.listMessages
    .map((element: { [k: string]: string }): string => {
      return `<li>${element.button}</li>`;
    })
    .reduce((a: string, b: string) => a + b);

  return `
              <div class="chat">
                  <div class="dialogs">
                      <div class="find">
                      <img class="icon" src=${addchat}$>
                      </div>
                      <ul class="list">
                        ${listDialogs}
                      </ul>
                  </div>
                  <div class="dialog">
                    <ul class="messages">
                        ${listMessages}
                    </ul>
                      ${props.send}
              </div>
                      `;
};
