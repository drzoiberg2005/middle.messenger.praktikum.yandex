import './chat.scss'
import Layout from '../../layout/index.js'
import content from 'bundle-text:./chat.pug'
import listTmpl from 'bundle-text:./components/list.pug'
import messagesTmpl from 'bundle-text:./components/messages.pug'
import shipmentTmpl from 'bundle-text:./components/shipment.pug'
import pug from 'pug'
import {
    dialogs,
    messages,
    user
} from '../../../static/consts'
import {
    sorting
} from '../../utils/sorting'
import {
    generateavatar
} from '../../utils/generateavatar'

export default class extends Layout {
    constructor(params) {
        super(params)
        if (!document.querySelector('.chat')) {
            user.display_name = 'Андрей'
            this.setTitle('Чат')
            this.postId = params.id;
            console.log(this.postId)
            this.updateLayout('main')
            this.renderContent(content)
            this.container.querySelector('#button-chat').classList.add('active')
            this.container.querySelector('#button-profile').classList.remove('active')
            this.container.querySelector('.header__title').innerText = 'Чат'
            renderDialogs(dialogs, params)
            renderMessages(messages, params)
            window.addEventListener('locationchange', () => {
                renderMessages(messages, params)
                if (params.id) {
                    this.container.querySelectorAll('.list__item').forEach(element => element.classList.remove('active'))
                    this.container.querySelector(`[id='${params.id}']`).classList.add('active')
                }
            })
        }
        this.input = this.container.querySelector('#finder')
        this.input.addEventListener('input', (e) => {
            document.body.querySelector('.list').innerHTML = ''
            renderDialogs(dialogs.filter(element => element.title.indexOf(e.target.value) !== -1))
        })
    }
    async getHtml() {
        return ''
    }
}

export const renderDialogs = (dialogs) => {
    if (dialogs.length > 0) {
        const arr = sorting(dialogs, 'last_message.time', true)
        arr.forEach(dialog => {
            const block = document.createElement('li')
            document.body.querySelector('.list').append(block)
            block.innerHTML = pug.render(listTmpl)
            block.querySelector('.list__item-left-avatar').append(generateavatar(dialog, 4, false))
            block.querySelector('.list__item').setAttribute('id', dialog.id)
            block.querySelector('.list__item').setAttribute('data-link', '/chats/' + dialog.id)
            block.querySelector('.list__item-left-text-contact').innerText = dialog.title
            block.querySelector('.list__item-left-text-message').innerText = dialog.last_message.content
            block.querySelector('.list__item-right-time').innerText = dialog.last_message.time.split('T')[1].split(':')[0] + ':' + dialog.last_message.time.split('T')[1].split(':')[1]
            block.querySelector('.list__item-right-counter').innerText = dialog.unread_count
        })
    } else {
        const block = document.createElement('span')
        block.classList.add('warning')
        document.body.querySelector('.list').append(block)
        block.innerText = 'Чаты не найдены'
    }

}

export const renderMessages = (messages, params) => {
    if (!params.id) {
        const block = document.createElement('span')
        block.classList.add('warning')
        document.body.querySelector('.messages').append(block)
        block.innerText = 'Выберите чат'
    } else if (messages.length > 0 && params.id) {
        const arr = sorting(messages, 'message', true)
        arr.forEach(message => {
            const block = document.createElement('li')
            document.body.querySelector('.messages').append(block)
            block.innerHTML = pug.render(messagesTmpl)
            if (message.in) {
                block.querySelector('.messages__item').classList.add('__send')
                block.querySelector('.messages__item-block').classList.add('__send')
            }
            block.querySelector('.message__item-text').innerText = message.message
        })
        const input = document.createElement('div')
        input.innerHTML = pug.render(shipmentTmpl)
        document.querySelector('.dialog').append(input)
    } else {
        const block = document.createElement('span')
        block.classList.add('warning')
        document.body.querySelector('.messages').append(block)
        block.innerText = 'Сообщений нет'
    }


}