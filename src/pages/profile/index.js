import './profile.scss'
import Layout from '../../layout/index.js'
import profile from 'bundle-text:./components/profile.pug'
import info from 'bundle-text:./components/info.pug'
import password from 'bundle-text:./components/password.pug'
import {
    user
} from '../../../static/consts'
import {
    generateavatar
} from '../../utils/generateavatar'
export default class extends Layout {
    constructor(params) {
        super(params)
        this.setTitle('Профиль')
        this.updateLayout('main')
        this.renderPage()

    }

    renderPage = () => {
        this.renderContent(profile)
        this.container.querySelector('#button-profile').classList.add('active')
        this.container.querySelector('#button-chat').classList.remove('active')
        this.container.querySelector('.header__title').innerText = 'Профиль'
        this.container.querySelector('.profile__block-avatar').append(generateavatar(user, 25))
        this.renderInfo()
        this.changeAvatar()
        passwordHandler.addEventListener('click', (e) => {
            e.preventDefault()
            this.renderContent(password)
            cancelpassword.addEventListener('click', (e) => {
                e.preventDefault()
                this.renderPage()
            })
        })
        infoHandler.addEventListener('click', (e) => {
            e.preventDefault()
            this.renderContent(info, {
                user: 'user'
            })
            cancelinfo.addEventListener('click', (e) => {
                e.preventDefault()
                this.renderPage()
            })
        })
    }

    renderInfo = () => {
        const userInfo = {
            "Имя": user.first_name,
            "Фамилия": user.second_name,
            "Логин": user.login,
            "E-mail": user.email,
            "Телефон": user.phone,
        }

        const title = document.createElement('span')
        title.classList.add('profile__block-title')
        title.innerText = user.display_name
        document.body.querySelector('.profile__block-info').before(title)
        for (var key in userInfo) {
            if (userInfo.hasOwnProperty(key)) {
                const li = document.createElement('li')
                const left = document.createElement('span')
                left.style.marginRight = '10px'
                left.innerText = key
                const right = document.createElement('span')
                right.innerText = userInfo[key]
                li.append(left)
                li.append(right)
                li.classList.add('profile__block-item')
                document.body.querySelector('.profile__block-info').append(li)
            }
        }
    }

    changeAvatar = () => {
        const modal = document.body.querySelector('.profile__modal')
        avatarHandler.addEventListener('click', () => {
            if (modal.classList.contains('__visible')) {
                modal.classList.remove('__visible')
            } else {
                modal.classList.add('__visible')

            }
        })
        selectavatar.addEventListener('click', () => {
            let file = input.files[0]
            console.log(file)
        })
        cancelavatar.addEventListener('click', () => {
            modal.classList.remove('__visible')
        })
    }
}