const template = (props: { message: string; in: boolean }) => `
    <div class="messages__item ${props.in ? "__send" : ""}">
        <div class="messages__item-block ${props.in ? "__send" : ""}">
            <span class="message__item-text">
                ${props.message}
            </span>
        </div>
    </div>
    `;

export default template;
