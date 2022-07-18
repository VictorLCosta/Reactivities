import { makeAutoObservable, runInAction } from 'mobx'
import { ServerError } from './../models/serverError';

class CommonStore {
    error: ServerError | null = null
    token: string | null = null
    appLoaded = false

    constructor () {
        makeAutoObservable(this)
    }

    setServerError = (error: ServerError) => {
        this.error = error
    }

    setToken = (token: string | null) => {
        if (token) window.localStorage.setItem('jwt', token)
        this.token = token
    }

    setAppLoaded = () => {
        this.appLoaded = true
    }
}

export default CommonStore