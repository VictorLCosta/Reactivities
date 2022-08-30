import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { makeAutoObservable, runInAction } from 'mobx';
import { ChatComment } from './../models/comment';
import { store } from './store';

class CommentStore {
    comments: ChatComment[] = []
    hubConnection: HubConnection | null = null

    constructor () {
        makeAutoObservable(this)
    }

    createHubConnection = async (activityId: string) => {
        if (store.activityStore.activity) {
            this.hubConnection = new HubConnectionBuilder()
                .withUrl(process.env.REACT_APP_CHAT_URL + `?activityId=${activityId}`, {
                    accessTokenFactory: () => store.userStore.currentUser?.token!
                })
                .withAutomaticReconnect()
                .configureLogging(LogLevel.Information)
                .build()

            this.hubConnection.start().catch(err => console.log("Error establishing the connection: " + err))

            this.hubConnection.on("LoadComments", (comments: ChatComment[]) => {
                runInAction(() => {
                    comments.forEach(comment => {
                        comment.createdAt = new Date(comment.createdAt)
                    })
                    this.comments = comments
                })
            })

            this.hubConnection.on("ReceiveComment", (comment: ChatComment) => {
                runInAction(() => {
                    comment.createdAt = new Date(comment.createdAt)
                    this.comments.push(comment)
                })
            })
        }
    }

    stopHubConnection = () => {
        this.hubConnection?.stop().catch(err => console.log('Error stopping the connection: ' + err))
    }

    clearComments = () => {
        this.comments = []
        this.stopHubConnection()
    }

    addComment = async (values: any) => {
        values.activityId = store.activityStore.activity?.id
        try {
           await this.hubConnection?.invoke("SendComment", values)
            
        } catch (error) {
            console.log(error)
        }
    }
}

export default CommentStore