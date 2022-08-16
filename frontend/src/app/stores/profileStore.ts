import { Profile } from "../models/profile"
import { makeAutoObservable, runInAction } from 'mobx';
import agent from "../api/agent";
import { store } from './store';

class ProfileStore {
    profile: Profile | null = null
    loadingProfile = false

    constructor() {
        makeAutoObservable(this)
    }

    get isCurrentUser() {
        if (store.userStore.currentUser && this.profile) {
            return store.userStore.currentUser.username === this.profile.username
        }
        return false
    }

    loadProfile = async (username: string) => {
        this.loadingProfile = true
        try {
            const profile = await agent.Profiles.get(username)
            runInAction(() => {
                this.profile = profile
                this.loadingProfile = false
            })
        } catch (error) {
            console.log(error)
            runInAction(() => this.loadingProfile = false)
        }
    }
}

export default ProfileStore