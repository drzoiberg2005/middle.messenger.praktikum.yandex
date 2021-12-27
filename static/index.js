import './index.scss'
import pageAuth from 'bundle-text:../src/pages/auth/auth.pug'
import pageRegister from 'bundle-text:../src/pages/register/register.pug'
import pageChat from 'bundle-text:../src/pages/chat/chat.pug'
import pageProfile from 'bundle-text:../src/pages/profile/profile.pug'
import page500 from 'bundle-text:../src/pages/500/500.pug'
import page404 from 'bundle-text:../src/pages/404/404.pug'

let title = 'Медиатор'

const root = document.getElementById('root')

const routes = {
    '/': pageAuth,
    '/register': pageRegister,
    '/chat': pageChat,
    '/profile': pageProfile,
    '/500': page500,
    '/404': page404,
}

const render = path => {
    root.innerHTML = routes[path] || page404
}
render(window.location.pathname)