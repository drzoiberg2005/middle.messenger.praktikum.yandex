import { navigateTo } from "../../static/router"

export default useHttp = async (url, method = 'GET', body = null, headers = {}) => {
    try {
        if (body) {
            body = JSON.stringify(body)
            headers['accept'] = 'application/json'
            headers['Content-Type'] = 'application/json'

        }
        const response = await fetch(`https://ya-praktikum.tech/api/v2${url}`, {
            method,
            body,
            headers
        })
        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || 'Что-то пошло не так')
        }

        return data
    } catch (e) {
        navigateTo('/500')
        console.log(e.message)
        throw e
    }

}