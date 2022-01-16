import './chat.scss'
import Layout from '../../layout/index.js'
import content from 'bundle-text:./chat.pug'
import listTmpl from 'bundle-text:./components/list.pug'
import pug from 'pug'
import {
    generateavatar
} from '../../utils/generateavatar'
import {
    addClass,
    removeClass,
    sorting
} from '../../utils/helpers'
import {
    logotype
} from '../../constants/logotype'
import {
    useHttp
} from '../../utils/http'
import {
    navigateTo
} from '../../../static/router'

export default class extends Layout {
    constructor(params) {
        super(params)
        this.params = params
        this.setTitle(`${logotype} - Чат`)
        this.updateLayout('main')
        this.renderContent(content)
        addClass(this.container.querySelector('#button-chat'), '__active')
        removeClass(this.container.querySelector('#button-profile'), '__active')
        this.container.querySelector('.header__title').innerText = 'Чат'
        this.getDialogs()
        if (!params.id) {
            this.message = document.createElement('span')
            addClass(this.message, 'warning')
            this.message.innerText = 'Выберите чат'
            this.container.querySelector('.messages')?.append(this.message)
        }
        this.finder = this.container.querySelector('#finder')
        this.finder?.addEventListener('input', (e) => {
            console.log("finder")
            this.getDialogs(e.target.value)
        })
        newchat.addEventListener('click', (e) => {
            e.preventDefault()
            alert('New Chat')
        })
    }

    getDialogs = async (finder) => {
        const dialogs = (await useHttp(`/chats${finder ? '?title='+ finder : ''}`)).response
        this.renderDialogs(dialogs)
    }

    renderDialogs = async (dialogs) => {
        this.container.querySelector('.list').innerHTML = ''
        sorting(dialogs, 'last_message.time', true)
        if (dialogs.length > 0) {
            dialogs.forEach(dialog => {
                this.li = document.createElement('li')
                addClass(this.li, 'list__item')
                if (this.params.id == dialog.id) {
                    addClass(this.li, '__active')
                }
                this.container.querySelector('.list')?.append(this.li)
                this.li.innerHTML = pug.render(listTmpl)
                this.li.querySelector('.list__item-left-avatar')?.append(generateavatar(dialog, 4, false))
                this.li.querySelector('.list__item-left-text-contact').innerText = dialog.title
                this.li.querySelector('.list__item-left-text-message').innerText = dialog.last_message ? dialog.last_message.content : ''
                this.li.querySelector('.list__item-right-time').innerText = dialog.last_message ? dialog.last_message.time.split('T')[1].split(':')[0] + ':' + dialog.last_message.time.split('T')[1].split(':')[1] : ''
                if (dialog.unread_count > 0) {
                    this.li.querySelector('.list__item-right-counter').innerText = dialog.unread_count
                } else {
                    removeClass(this.li.querySelector('.list__item-right-counter'), 'list__item-right-counter')
                }
                this.li.addEventListener('click', () => {
                    navigateTo(`/chats/${dialog.id}`)
                })
            })
        } else {
            this.warning = document.createElement('span')
            addClass(this.warning, 'warning')
            this.warning.innerText = 'Чаты не найдены'
            this.container.querySelector('.list')?.append(this.warning)
        }
    }
}