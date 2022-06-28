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
                this.setActivity(item)
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

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id)
        if (activity) {
            this.activity = activity
        } else {
            this.loading = true
            try {
                activity = await agent.Activities.details(id)
                runInAction(() => {
                    this.setActivity(activity!)
                    this.activity = activity
                    this.setLoadingInitial(false)
                })
            } catch (error) {
                console.log(error)
                this.loadingInitial = false
            }
        }
    }

    private setActivity = (activity: Activity) => {
        activity.date = activity.date.split('T')[0]
        this.activityRegistry.set(activity.id, activity)
    }

    private getActivity = (id: string) => {
        return this.activityRegistry.get(id)
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