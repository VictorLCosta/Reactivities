import { User, UserFormValues } from "../models/user"
import { makeAutoObservable, runInAction } from 'mobx';
import { store } from "./store";
import agent from "../api/agent";
import { history } from "../..";

class UserStore {
    currentUser: User | null = null

    constructor () {
        makeAutoObservable(this)
    }

    get isLoggedIn () {
        return !!this.currentUser
    }

    login = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.login(creds)
            store.commonStore.setToken(user.token)
            runInAction(() => {
                this.currentUser = user
            })
            history.push('/activities')
        } catch (error) {
            throw error
        }
    }

    logout = () => {
        store.commonStore.setToken(null)
        window.localStorage.removeItem('jwt')
        this.currentUser = null
        history.push('/')
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current()
            runInAction(() => this.currentUser = user)
        } catch (error) {
            console.log(error)
        }
    }
}

export default UserStore