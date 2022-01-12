import './register.scss'
import Layout from '../../layout/index.js'
import content from 'bundle-text:./register.pug'

export default class extends Layout {
  constructor(params) {
    super(params)
    this.setTitle('Регистрация')
    this.updateLayout('simple')
        this.subTitle = this.container.querySelector('.simple__page-content-item-subtitle')
        this.subTitle.innerText = 'Авторизация'
        this.renderContent(content)
  }
}