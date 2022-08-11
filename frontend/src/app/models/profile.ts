import { User } from "./user";

export interface Profile {
    username: string,
    displayName: string,
    image?: string,
    bio?: string,
    photos: Photo[]
}

export class Profile implements Profile {
    constructor(user: User) {
        this.username = user.username
        this.displayName = user.displayName
        this.image = user.image
    }
}

export interface Photo {
    url: string,
    publicId: string,
    isMain: boolean
}