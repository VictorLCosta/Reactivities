import { User, UserFormValues } from "../models/user"
import { makeAutoObservable } from 'mobx';
import agent from "../api/agent";

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
            console.log(user)
        } catch (error) {
            throw error
        }
    }
}

export default UserStore