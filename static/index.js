import { requestUser } from '../src/utils/requestuser'
import './fonts.scss'
import './index.scss'
import {
    navigateTo,
    router
} from './router'

window.addEventListener('popstate', router)

document.addEventListener('DOMContentLoaded', async () => {
    await requestUser()
    document.body.addEventListener('click', (e) => {
        if (e.target.matches('[data-link]')) {
            e.preventDefault()
            navigateTo(e.target.getAttribute('data-link'))
        }
    })
    router()
})