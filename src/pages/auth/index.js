import Layout from '../../layout/index.js'
import {
    navigateTo
} from '../../../static/router'
import {
    Form
} from '../../components/form'
import {
    logotype
} from '../../constants/logotype.js'
import {
    authForm
} from '../../constants/inputs.js'
import {
    requestUser
} from '../../utils/requestuser.js'

export default class extends Layout {
    constructor(params) {
        super(params)
        this.setTitle(`${logotype} - Авторизация`)
        this.updateLayout('simple')
        this.subTitle = this.container.querySelector('.simple__page-content-item-subtitle')
        this.subTitle.innerText = 'Авторизация'
        this.main = this.container.querySelector('main')
        this.main.innerHTML = ''
        this.main.append(new Form({
            fields: authForm,
            buttonTitleSubmit: 'Войти',
            buttonTitleCancel: 'Зарегистрироваться',
            url: '/auth/signin',
            successCallback: success,
            cancelCallback: cancel,
            isPassword: false
        }))
    }
}

const success = async () => {
    await requestUser()
    navigateTo('/chats')
}

const cancel = () => {
    navigateTo('/register')
}