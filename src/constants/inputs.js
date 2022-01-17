let user = JSON.parse(localStorage.getItem('user'))

export const authForm = [{
        title: 'Логин',
        id: 'login',
        type: 'text'
    },
    {
        title: 'Пароль',
        id: 'password',
        type: 'password',
        suggested: 'current-password'
    }
]

export const registerForm = [{
        title: 'Имя',
        id: 'first_name',
        type: 'text',
    },
    {
        title: 'Фамилия',
        id: 'second_name',
        type: 'text'
    },
    {
        title: 'Имя в чате',
        id: 'display_name',
        type: 'text'
    },
    {
        title: 'Логин',
        id: 'login',
        type: 'text'
    },
    {
        title: 'E-mail',
        id: 'email',
        type: 'email'
    },
    {
        title: 'Телефон',
        id: 'phone',
        type: 'tel'
    },
    {
        title: 'Пароль',
        id: 'password',
        type: 'password',
        suggested: 'new-password'
    },
    {
        title: 'Пароль еще раз',
        id: 'retrypassword',
        type: 'password',
        suggested: 'new-password'
    }
]

export const passwordForm = [{
        title: 'Старый пароль',
        id: 'oldPassword',
        type: 'password',
        suggested: 'current-password'
    },
    {
        title: 'Пароль',
        id: 'newPassword',
        type: 'password',
        suggested: 'new-password'

    },
    {
        title: 'Пароль еще раз',
        id: 'retrypassword',
        type: 'password',
        suggested: 'new-password'

    }
]

export let infoForm = [{
        title: 'Имя',
        id: 'first_name',
        type: 'text',
        value: user ? user.first_name : ''
    },
    {
        title: 'Фамилия',
        id: 'second_name',
        type: 'text',
        value: user ? user.second_name : ''
    },
    {
        title: 'Имя в чате',
        id: 'display_name',
        type: 'text',
        value: user ? user.display_name : ''
    },
    {
        title: 'Логин',
        id: 'login',
        type: 'text',
        value: user ? user.login : ''
    },
    {
        title: 'E-mail',
        id: 'email',
        type: 'email',
        value: user ? user.email : ''
    },
    {
        title: 'Телефон',
        id: 'phone',
        type: 'tel',
        value: user ? user.phone : ''
    }
]