import Layout from '../../layout/index.js'
import content from 'bundle-text:./404.pug'
import {
  logotype
} from '../../constants/logotype.js'

export default class extends Layout {
  constructor(params) {
    super(params)
    this.setTitle(`${logotype} - Ошибка 404`)
    this.updateLayout('simple')
    this.subTitle = this.container.querySelector('.simple__page-content-item-subtitle')
    this.subTitle.innerText = '404'
    this.renderContent(content)
  }
}