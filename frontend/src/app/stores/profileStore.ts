import { Photo, Profile } from "../models/profile"
import { makeAutoObservable, runInAction } from 'mobx';
import agent from "../api/agent";
import { store } from './store';

class ProfileStore {
    profile: Profile | null = null
    loadingProfile = false
    uploading = false
    loading = false

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

    uploadPhoto = async (file: Blob) => {
        this.uploading = true
        try {
            const response = await agent.Profiles.uploadPhoto(file)
            const photo = response.data

            runInAction(() => {
                if (this.profile) {
                    this.profile.photos?.push(photo)
                    if (photo.isMain && store.userStore.currentUser) {
                        store.userStore.setImage(photo.url)
                        this.profile.image = photo.url
                    }
                }
                this.uploading = false
            })
        } catch (error) {
            console.log(error)
            runInAction(() => this.uploading = false)
        }
    }

    setMainPhoto = async (photo: Photo) => {
        this.loading = true
        try {
            await agent.Profiles.setMainPhoto(photo.publicId)
            store.userStore.setImage(photo.url)

            runInAction(() => {
                if (this.profile && this.profile.photos) {
                    this.profile.photos.find(p => p.isMain)!.isMain = false
                    this.profile.photos.find(p => p.publicId == photo.publicId)!.isMain = true
                    this.profile.image = photo.url
                    this.loading = false

                    this.updatePhotosInActivityList()
                }
            })
        } catch (error) {
            runInAction(() => this.loading = false)
            console.log(error)
        }
    }

    deletePhoto = async (photo: Photo) => {
        this.loading = true
        try {
            await agent.Profiles.deletePhoto(photo.publicId)
            store.userStore.setImage(photo.url)

            runInAction(() => {
                if (this.profile) {
                    this.profile.photos = this.profile.photos?.filter(p => p.publicId !== photo.publicId)
                    this.loading = false
                }
            })
        } catch (error) {
            runInAction(() => this.loading = false)
            console.log(error)
        }
    }

    private updatePhotosInActivityList () {
        store.activityStore.loadActivities()
    }
}

export default ProfileStore