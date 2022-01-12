import main from 'bundle-text:./main.pug'
import simple from 'bundle-text:./simple.pug'
import './main.scss'
import './simple.scss'
import '../components/sidebar/sidebar.scss'
import '../components/header/header.scss'
import pug from 'pug'
import {
    logo,
    user
} from '../../static/consts'
import { generateavatar } from '../utils/generateavatar'

export default class {
    constructor(params) {
        this.container = document.body
        this.params = params
    }

    updateLayout = (type) => {
        switch (type) {
            case 'main':
                this.page = this.container.querySelector('#main__page')
                if (!this.page) {
                    this.container.innerHTML = pug.render(main)
                    this.logo = document.body.querySelector('#logo')
                    this.logo.innerText = logo
                    this.container.querySelector('.header__user').prepend(generateavatar(user, 5))
                    this.displayName = document.body.querySelector('.header__user-name')
                    this.displayName.innerText = user.display_name
                    return pug.render(main)
                }
                break
            case 'simple':
                this.page = this.container.querySelector('#simple__page')
                if (!this.page) {
                    this.container.innerHTML = pug.render(simple)
                    this.title = document.body.querySelector('.simple__page-content-item-title')
                    this.title.innerText = logo
                }
                break
            default:
                console.log('Не указан тип шаблона страницы!')
        }
    }

    setTitle = (title) => {
        document.title = title
    }

    renderContent = (content) => {
        this.main = this.container.querySelector('main')
        this.main.innerHTML = pug.render(content)
    }

    async getHtml() {
        return '';
    }

}