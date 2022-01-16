import './profile.scss'
import Layout from '../../layout/index.js'
import profile from 'bundle-text:./profile.pug'
import {
    generateavatar
} from '../../utils/generateavatar'
import {
    useHttp
} from '../../utils/http'
import {
    logotype
} from '../../constants/logotype'
import {
    navigateTo
} from '../../../static/router'
import {
    Form
} from '../../components/form'
import {
    infoForm,
    passwordForm
} from '../../constants/inputs'
import {
    addClass,
    removeClass,
} from '../../utils/helpers'
import {
    requestUser
} from '../../utils/requestuser'

export default class extends Layout {
    constructor(params) {
        super(params)
        this.setTitle(`${logotype} - Профиль`)
        this.updateLayout('main')
        addClass(this.container.querySelector('#button-profile'), '__active')
        removeClass(this.container.querySelector('#button-chat'), '__active')
        this.container.querySelector('.header__title').innerText = 'Профиль'
        this.renderPage()
    }
    renderPage = async () => {
        this.renderContent(profile)
        this.renderInfo()
        this.changeAvatar()
        this.changeInfo()
        this.changePassword()
        logout.addEventListener('click', () => {
            useHttp('/auth/logout', 'POST')
            navigateTo('/')
        })
    }

    renderInfo = async () => {
        let user = JSON.parse(localStorage.getItem('user'))
        const userInfo = {
            "ID": user.id,
            "Имя": user.first_name,
            "Фамилия": user.second_name,
            "Логин": user.login,
            "E-mail": user.email,
            "Телефон": user.phone,
        }
        this.container.querySelector('.profile__block-avatar')?.append(generateavatar(user, 18))
        this.container.querySelector('.profile__block-title').innerText = user.display_name

        for (var key in userInfo) {
            if (userInfo.hasOwnProperty(key)) {
                this.li = document.createElement('li')
                this.left = document.createElement('span')
                this.left.style.marginRight = '10px'
                this.left.innerText = key
                this.right = document.createElement('span')
                this.right.innerText = userInfo[key]
                this.li.append(this.left)
                this.li.append(this.right)
                addClass(this.li, 'profile__block-item')
                this.container.querySelector('.profile__block-info')?.append(this.li)
            }
        }
    }

    changeAvatar = () => {
        this.modal = this.container.querySelector('.profile__modal')
        avatarHandler.addEventListener('click', () => {
            if (this.modal?.classList.contains('__visible')) {
                removeClass(this.modal, '__visible')
            } else {
                addClass(this.modal, '__visible')

            }
        })
        selectavatar.addEventListener('click', () => {
            const input = this.container.querySelector('#file-input')
            input?.click((e) => {
                let file = e.target.files[0]
                console.log(file)
            })

        })
        cancelavatar.addEventListener('click', () => {
            removeClass(this.modal, '__visible')
        })
    }

    changePassword = () => {
        this.open = this.container.querySelector('#passwordHandler')
        this.open.addEventListener('click', (e) => {
            e.preventDefault()
            this.main.innerHTML = ''
            this.block = document.createElement('div')
            addClass(this.block, 'profile__change-block')
            this.main.append(this.block)
            this.title = document.createElement('span')
            addClass(this.title, 'profile__block-title')
            this.title.innerText = 'Изменить пароль'
            this.block.append(this.title)
            this.block.append(new Form({
                fields: passwordForm,
                buttonTitleSubmit: 'Сохранить',
                buttonTitleCancel: 'Назад',
                url: '/user/password',
                successCallback: success,
                cancelCallback: this.renderPage,
                method: 'PUT',
                isPassword: true
            }))
        })
    }

    changeInfo = () => {
        this.open = this.container.querySelector('#infoHandler')
        this.open?.addEventListener('click', (e) => {
            e.preventDefault()
            this.main.innerHTML = ''
            this.block = document.createElement('div')
            addClass(this.block, 'profile__change-block')
            this.main.append(this.block)
            this.title = document.createElement('span')
            addClass(this.title, 'profile__block-title')
            this.title.innerText = 'Изменить данные'
            this.block.append(this.title)
            this.block.append(new Form({
                fields: infoForm,
                buttonTitleSubmit: 'Сохранить',
                buttonTitleCancel: 'Назад',
                url: '/user/profile',
                successCallback: success,
                cancelCallback: this.renderPage,
                method: 'PUT',
                isPassword: false
            }))
        })
    }
}

const success = async () => {
    await requestUser()
    navigateTo('/profile')
}