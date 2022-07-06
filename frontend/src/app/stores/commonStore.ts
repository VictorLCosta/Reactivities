import { makeAutoObservable, runInAction } from 'mobx'
import { ServerError } from './../models/serverError';

class CommonStore {
    error: ServerError | null = null

    constructor () {
        makeAutoObservable(this)
    }

    setServerError = (error: ServerError) => {
        this.error = error
    }
}

export default CommonStore