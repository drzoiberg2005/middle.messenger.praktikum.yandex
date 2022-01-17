import {
    messages
} from '../../../../static/_consts'
import messagesTmpl from 'bundle-text:./messages.pug'
import shipmentTmpl from 'bundle-text:./shipment.pug'
import pug from 'pug'
import Chat from '../index'
import {
    addClass,
    sorting
} from '../../../utils/helpers'

export default class extends Chat {
    constructor(params) {
        super(params)
        this.renderMessages(messages)
        addfile.addEventListener('click', (e) => {
            e.preventDefault()
            alert('Add file')
        })
    }
    renderMessages = (messages) => {
        sorting(messages, 'message', true)
        document.body.querySelector('.messages').innerHTML = ''
        if (messages.length > 0) {
            messages.forEach(message => {
                this.li = document.createElement('li')
                this.li.innerHTML = pug.render(messagesTmpl)
                if (message.in) {
                    addClass(this.li.querySelector('.messages__item'), '__send')
                    addClass(this.li.querySelector('.messages__item-block'), '__send')
                }
                this.li.querySelector('.message__item-text').innerText = message.message
                this.container.querySelector('.messages')?.append(this.li)
            })
            if (!document.querySelector('.shipment')) {
                const input = document.createElement('div')
                input.innerHTML = pug.render(shipmentTmpl)
                document.querySelector('.dialog').append(input)
                this.form = this.container.querySelector('form')
                this.form?.addEventListener('submit', (e) => {
                    e.preventDefault()
                    messages.unshift({
                        in: true,
                        message: this.container.querySelector('.shipment__input')?.value
                    })
                    this.renderMessages(messages)
                })
            }
        } else {
            this.warning = document.createElement('span')
            this.warning.classList.add('warning')
            document.body.querySelector('.messages')?.append(this.warning)
            this.warning.innerText = 'Сообщений нет'
        }
    }
}