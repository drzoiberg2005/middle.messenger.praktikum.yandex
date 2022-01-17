import main from 'bundle-text:./main.pug'
import simple from 'bundle-text:./simple.pug'
import './main.scss'
import './simple.scss'
import '../components/button/button.scss'
import '../components/sidebar/sidebar.scss'
import '../components/header/header.scss'
import pug from 'pug'
import {
    logotype
} from '../constants/logotype'
import {
    generateavatar
} from '../utils/generateavatar'

export default class {
    constructor(params) {
        this.container = document.body
    }

    updateLayout = async (type) => {
        let user = JSON.parse(localStorage.getItem('user'))
        switch (type) {
            case 'main':
                this.page = this.container.querySelector('#main__page')
                if (!this.page) {
                    this.container.innerHTML = pug.render(main)
                    this.container.querySelector('#logo').innerText = logotype
                }
                if (this.container.querySelector('.header__user-name').innerText !== user.display_name) {
                    this.container.querySelector('.header__user-avatar').innerHTML = ''
                    this.container.querySelector('.header__user-avatar').append(generateavatar(user, 5))
                    this.container.querySelector('.header__user-name').innerText = user.display_name
                }
                break
            case 'simple':
                this.page = this.container.querySelector('#simple__page')
                if (!this.page) {
                    this.container.innerHTML = pug.render(simple)
                    this.title = document.body.querySelector('.simple__page-content-item-title')
                    this.title.innerText = logotype
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
}