import Layout from '../../layout/index.js'
import {
  Form
} from '../../components/form'
import {
  logotype
} from '../../constants/logotype.js'
import {
  registerForm
} from '../../constants/inputs.js'
import {
  navigateTo
} from '../../../static/router.js'
import {
  requestUser
} from '../../utils/requestuser.js'

export default class extends Layout {
  constructor(params) {
    super(params)
    this.setTitle(`${logotype} - Регистрация`)
    this.updateLayout('simple')
    this.subTitle = this.container.querySelector('.simple__page-content-item-subtitle')
    this.subTitle.innerText = 'Регистрация'
    this.main = this.container.querySelector('main')
    this.form = this.main?.querySelector('form')
    if (this.form) {
      this.main.innerHTML = ''
    }
    this.main.prepend(new Form({
      fields: registerForm,
      buttonTitleSubmit: 'Зарегистрироваться',
      buttonTitleCancel: 'Войти',
      url: '/auth/signup',
      successCallback: success,
      cancelCallback: cancel,
      isPassword: true
    }))
  }
}

const success = async () => {
  await requestUser()
  navigateTo('/chats')
}

const cancel = () => {
  navigateTo('/')
}