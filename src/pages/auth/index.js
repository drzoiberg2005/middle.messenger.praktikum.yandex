import './auth.scss'
import Layout from '../../layout/index.js'
import content from 'bundle-text:./auth.pug'

export default class extends Layout {
    constructor(params) {
        super(params)
        this.setTitle('Авторизация')
        this.updateLayout('simple')
        this.subTitle = this.container.querySelector('.simple__page-content-item-subtitle')
        this.subTitle.innerText = 'Авторизация'
        this.renderContent(content)
    }
}