import Auth from '../src/pages/auth/index.js'
import Register from '../src/pages/register/index.js'
import Chat from '../src/pages/chat/index.js'
import Profile from '../src/pages/profile/index.js'
import Page500 from '../src/pages/500/index.js'
import Page404 from '../src/pages/404/index.js'
import Messages from '../src/pages/chat/components/messages.js'

const pathtoRegex = (path) => new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$')

const getParams = (match) => {
    const values = match.result.slice(1)
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map((result) => result[1])

    return Object.fromEntries(keys.map((key, index) => {
        return [key, values[index]]
    }))
}

export const navigateTo = (url) => {
    history.pushState(null, null, url)
    router()
}

export const router = async () => {

    const routes = [{
            path: '/',
            page: Auth
        },
        {
            path: '/register',
            page: Register
        },
        {
            path: '/chats',
            page: Chat
        },
        {
            path: '/chats/:id',
            page: Messages
        },
        {
            path: '/profile',
            page: Profile
        },
        {
            path: '/500',
            page: Page500
        },
        {
            path: '/404',
            page: Page404
        }
    ]

    const variableMatches = routes.map((route) => {
        return {
            route: route,
            result: location.pathname.match(pathtoRegex(route.path))
        }
    })

    let match = variableMatches.find((varMatch) => varMatch.result !== null)
    if (!match) {
        match = {
            route: routes[routes.length - 1],
            result: [location.pathname]
        }
    }

    new match.route.page(getParams(match))
}