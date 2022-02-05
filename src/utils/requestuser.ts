import { navigateTo } from "../../static/router"
import {
    useHttp
} from "./http"


export const requestUser = async () => {
    const response = await useHttp('/auth/user')
    if (response.status == 200) {
        localStorage.setItem('user', JSON.stringify(response.response))
    }
    if (response.status == 401) {
        navigateTo('/')
    }
}