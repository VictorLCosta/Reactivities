import { User, UserFormValues } from "../models/user"
import { makeAutoObservable, runInAction } from 'mobx';
import { store } from "./store";
import agent from "../api/agent";
import { history } from "../..";

class UserStore {
    currentUser: User | null = null
    fbAccessToken: string | null = null
    fbLoading = false

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
            store.modalStore.closeModal()
            history.push('/activities')
        } catch (error) {
            throw error
        }
    }

    register = async (creds: UserFormValues) => {
        try {
            var user = await agent.Account.register(creds)
            store.commonStore.setToken(user.token)
            runInAction(() => this.currentUser = user)
            store.modalStore.closeModal()
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

    setImage = (image: string) => {
        if (this.currentUser) {
            this.currentUser.image = image
        }
    }

    setDisplayName = (name: string) => {
        if (this.currentUser) this.currentUser.displayName = name;
    }

    facebookLogin = () => {
        window.FB.login(res => {
            agent.Account.fbLogin(res.authResponse.accessToken).then(user => console.log(user))
        }, { scope: 'public_profile,email' })
    }

    getFacebookLoginStatus = async () => {
        this.fbLoading = true;
        const apiLogin = (accessToken: string) => {
            agent.Account.fbLogin(accessToken).then(user => {
                store.commonStore.setToken(user.token)
                runInAction(() => {
                    this.currentUser = user
                    this.fbLoading = false
                })
                history.push("/activities")
            }).catch(error => {
                console.log(error)
                runInAction(() => this.fbLoading = false)
            })
        }

        if (this.fbAccessToken) {
            apiLogin(this.fbAccessToken)
        } else {
            window.FB.login(res => {
                apiLogin(res.authResponse.accessToken)
            }, { scope: 'public_profile,email' })
        }
    }
}

export default UserStore