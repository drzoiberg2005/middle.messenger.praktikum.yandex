import Layout from '../../layout/index.js'
import content from 'bundle-text:./500.pug'

export default class extends Layout {
  constructor(params) {
    super(params)
    this.setTitle('Ошибка 500')
    this.updateLayout('simple')
    this.subTitle = this.container.querySelector('.simple__page-content-item-subtitle')
    this.subTitle.innerText = '500'
    this.renderContent(content)
  }
}