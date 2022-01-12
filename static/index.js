import './fonts.scss'
import './index.scss'
import {
    navigateTo,
    router
} from './router'

const lasturl = localStorage.getItem('lasturl')
// if (lasturl) {
//     navigateTo(lasturl)
// }
window.addEventListener('popstate', router)

document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', (e) => {
        if (e.target.matches('[data-link]')) {
            e.preventDefault()
            navigateTo(e.target.getAttribute('data-link'))
        }
    })
    router()
})