import { makeAutoObservable, runInAction } from 'mobx'
import { v4 as uuid } from 'uuid'
import agent from '../api/agent'

import { Activity } from '../models/activity'

class ActivityStore {
    activityRegistry = new Map<string, Activity>()
    activity: Activity | undefined = undefined
    editMode = false
    loading = false
    loadingInitial = false

    constructor () {
        makeAutoObservable(this)
    }

    get activitiesByDate () {
        return Array.from(this.activityRegistry.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
    }

    loadActivities = async () => {
        this.setLoadingInitial(true)
        try {
            const activities = await agent.Activities.list();
            activities.forEach(item => {
                item.date = item.date.split('T')[0]
                this.activityRegistry.set(item.id, item)
            })

            this.setLoadingInitial(false)
            
        } catch (error) {
            console.log(error)
            this.setLoadingInitial(false)
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state
    }

    selectActivity = (id: string) => {
        this.activity = this.activityRegistry.get(id)
    }

    cancelSelectedActivity = () => {
        this.activity = undefined
    }

    openForm = (id?: string) => {
        id ? this.selectActivity(id) : this.cancelSelectedActivity()
        this.editMode = true
    }

    closeForm = () => {
        this.editMode = false
    }

    createActivity = async (activity: Activity) => {
        this.loading = true
        activity.id = uuid()

        try {
            await agent.Activities.create(activity)
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity)
                this.activity = activity
                this.editMode = false
                this.loading = false
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false
            })
        }
    }

    updateActivity = async (activity: Activity) => {
        this.loading = true

        try {
            await agent.Activities.update(activity)
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity)
                this.activity = activity
                this.editMode = false
                this.loading = false
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false
            })
        }
    }

    deleteActivity = async (id: string) => {
        this.loading = true

        try {
            await agent.Activities.delete(id)
            runInAction(() => {
                this.activityRegistry.delete(id)
                if (this.activity?.id === id) this.cancelSelectedActivity()
                this.loading = false
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false
            })
        }
    }
}

export default ActivityStore