import './form.scss'
import content from 'bundle-text:./form.pug'
import pug from 'pug'
import {
    addClass,
    isEmptyField,
    setAttributes
} from '../../utils/helpers'
import {
    useHttp
} from '../../utils/http'
import {
    navigateTo
} from '../../../static/router'

export class Form {
    constructor(props) {
        this.fields = props.fields
        this.buttonTitle = props.buttonTitle
        this.form = document.createElement('form')
        addClass(this.form, 'form')
        setAttributes(this.form, {
            id: 'form'
        })
        this.ul = document.createElement('ul')
        addClass(this.ul, 'form__block')
        this.form.append(this.ul)
        this.renderFields()
        this.warning = document.createElement('span')
        addClass(this.warning, 'form__warning-message')
        this.form.append(this.warning)
        this.buttonSubmit = document.createElement('button')
        addClass(this.buttonSubmit, 'button')
        setAttributes({
            type: 'submit'
        })
        this.buttonSubmit.innerText = props.buttonTitleSubmit
        this.form.append(this.buttonSubmit)
        this.buttonCancel = document.createElement('button')
        addClass(this.buttonCancel, 'button')
        addClass(this.buttonCancel, '__invert')
        this.buttonCancel.innerText = props.buttonTitleCancel
        this.form.append(this.buttonCancel)
        this.buttonCancel.addEventListener('click', (e) => {
            e.preventDefault()
            props.cancelCallback()
        })
        this.submit(props.url, props.successCallback, props.method, props.isPassword)
        return this.form
    }

    renderFields = () => {
        this.ul.innerHTML = ''
        this.fields.forEach(field => {
            this.li = document.createElement('li')
            addClass(this.li, 'form__unit')
            this.li.innerHTML = pug.render(content)
            this.title = this.li.querySelector('.form__title')
            this.title.innerText = field.title
            this.input = this.li.querySelector('.form__input')
            setAttributes(this.input, {
                type: field.type ? field.type : '',
                id: field.id ? field.id : '',
                value: field.value ? field.value : '',
                suggested: field.suggested ? field.suggested : '',
                autocomplete: 'on'
            })
            this.ul.append(this.li)
            this.input.addEventListener('input', (e) => {
                e.preventDefault()
                field.value = e.target.value
            })
        })
    }

    submit = (url, successCallback, method = 'POST', isPassword = false, isNewPassword = false) => {
        this.form.addEventListener('submit', async (e) => {
            e.preventDefault()
            let data = {}
            this.fields.map((input) => {
                data = {
                    ...data,
                    ...{
                        [input.id]: input.value ? input.value : ''
                    }
                }
            })
            const emptyField = isEmptyField(data)
            if (emptyField) {
                const fieldName = this.fields.find(input => input.id === emptyField).title
                this.warning.innerText = `Вы пропустили поле: ${fieldName.toUpperCase()}`
                return
            }
            if (isPassword) {
                if ((isNewPassword ? data.newPassword.length : data.password.length) < 6) {
                    this.warning.innerText = 'Минимальная длина пароля 6 символов'
                    return
                }
                if (data.retrypassword !== (isNewPassword ? data.newPassword : data.password)) {
                    this.warning.innerText = 'Пароль не совпадает'
                    return
                }
                delete data['retrypassword']
            }
            const result = await useHttp(url, method, data)
            if (result.status == 200) {
                successCallback()
            } else if (400 <= result.status < 500) {
                this.warning.innerText = result.response.reason
            } else if (result.status == 500) {
                navigateTo('/500')
            }
        })
    }
}