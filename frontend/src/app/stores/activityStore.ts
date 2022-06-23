import { makeAutoObservable } from 'mobx'
import agent from '../api/agent'

import { Activity } from '../models/activity'

class ActivityStore {
    activities: Activity[] = []
    activity: Activity | undefined = undefined
    editMode = false
    loading = false
    loadingInitial = false

    constructor () {
        makeAutoObservable(this)
    }

    loadActivities = async () => {
        this.setLoadingInitial(true)
        try {
            const activities = await agent.Activities.list();
            activities.forEach(item => {
                item.date = item.date.split('T')[0]
                this.activities.push(item)
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
        this.activity = this.activities.find(x => x.id === id)
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
}

export default ActivityStore