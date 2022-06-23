import { makeAutoObservable } from 'mobx'
import agent from '../api/agent'

import { Activity } from '../models/activity'

class ActivityStore {
    activities: Activity[] = []
    activity: Activity | null = null
    editMode = false
    loading = false
    loadingInitial = false

    constructor () {
        makeAutoObservable(this)
    }

    loadActivities = async () => {
        this.loadingInitial = true
        try {
            const activities = await agent.Activities.list();

            activities.forEach(item => {
                item.date = item.date.split('T')[0]
                this.activities.push(item)
            })

            this.loadingInitial = false
        } catch (error) {
            console.log(error)
        }
    }
}

export default ActivityStore