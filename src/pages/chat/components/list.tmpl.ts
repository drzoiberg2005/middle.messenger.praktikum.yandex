const template = (props: {
  contact: string;
  message: string;
  time: string;
  counter: string;
}) => `
        <div class="list__item-left">
            <div class="list__item-left-avatar ">
            </div>
            <div class="list__item-left-text">
                <span class="list__item-left-text-contact">
                    ${props.contact}
                </span>
                <span class="list__item-left-text-message">
                    ${props.message}
                </span>
            </div>
        </div>
        <div class="list__item-right">
            <span class="list__item-right-time">
                ${props.time}
            </span>
            <span class="list__item-right-counter">
                ${props.counter}
            </span>
        </div>
        `;

export default template;
