import { makeAutoObservable, runInAction } from 'mobx'
import agent from '../api/agent'
import { format } from 'date-fns'

import { Activity, ActivityFormValues } from '../models/activity'
import { store } from './store'
import { Profile } from '../models/profile'

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
        return Array.from(this.activityRegistry.values()).sort((a, b) => a.date!.getTime() - b.date!.getTime())
    }

    get groupedActivities () {
        return Object.entries(
            this.activitiesByDate.reduce((activities, activity) => {
                const date = format(activity.date!, 'dd MMM yyyy')
                activities[date] = activities[date] ? [...activities[date], activity] : [activity]
                return activities
            }, {} as {[key: string]: Activity[]})
        )
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
            return activity;
        } else {
            this.loading = true
            try {
                activity = await agent.Activities.details(id)
                runInAction(() => {
                    this.setActivity(activity!)
                    this.activity = activity
                    this.setLoadingInitial(false)
                    this.loading = false
                })
                return activity
            } catch (error) {
                this.setLoadingInitial(false)
                this.loading = false
            }
        }
    }

    private setActivity = (activity: Activity) => {
        const user = store.userStore.currentUser;

        if (user) {
            activity.isGoing = activity.attendees!.some(x => x.username == user.username)
            activity.isHost = activity.hostUsername == user.username
            activity.host = activity.attendees?.find(x => x.username === activity.hostUsername)
        }

        activity.date = new Date(activity.date!)
        this.activityRegistry.set(activity.id, activity)
    }

    private getActivity = (id: string) => {
        return this.activityRegistry.get(id)
    }

    createActivity = async (activity: ActivityFormValues) => {
        const user = store.userStore.currentUser;
        const attendee = new Profile(user!)

        try {
            await agent.Activities.create(activity)

            const newActivity = new Activity(activity);
            newActivity.hostUsername = user!.username
            newActivity.attendees = [attendee]

            this.setActivity(newActivity)

            runInAction(() => {
                this.activity = newActivity
            })
        } catch (error) {
            console.log(error)
        }
    }

    updateActivity = async (activity: ActivityFormValues) => {
        try {
            await agent.Activities.update(activity)
            runInAction(() => {
                if (activity.id) {
                    let updatedActivity = {...this.getActivity(activity.id), ...activity}
                    this.activityRegistry.set(activity.id, updatedActivity as Activity)
                    this.activity = updatedActivity as Activity
                }
            })
        } catch (error) {
            console.log(error)
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

    updateAttendance = async () => {
        const user = store.userStore.currentUser
        this.loading = true

        try {
            await agent.Activities.attend(this.activity!.id)
            runInAction(() => {
                if (this.activity?.isGoing) {
                    this.activity.attendees = this.activity.attendees?.filter(a => a.username !== user?.username)
                    this.activity.isGoing = false
                } else {
                    const attendee = new Profile(user!)
                    this.activity?.attendees?.push(attendee)
                }
                this.activityRegistry.set(this.activity!.id, this.activity!)
            })
        } catch (error) {
            console.log(error)
        } finally {
            runInAction(() => this.loading = false)
        }
    }

    cancelActivityToggle = async () => {
        this.loading = true

        try {
            await agent.Activities.attend(this.activity!.id)
            runInAction(() => {
                this.activity!.isCancelled = !this.activity?.isCancelled
                this.activityRegistry.set(this.activity!.id, this.activity!)
            })
        } catch (error) {
            console.log(error)
        } finally {
            runInAction(() => this.loading = false)
        }
    }

    clearSelectedActivity = () => {
        this.activity = undefined
    }

}

export default ActivityStore