import agent from '../api/agent';
import { useEffect, useState } from 'react'
import { Container } from 'semantic-ui-react'
import Navbar from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';

import './styles.css'

import { Activity } from './../models/activity';
import Loading from './Loading';

import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';


const App = (props: any) => {
    const {activityStore} = useStore()

    const [activities, setActivities] = useState<Activity[]>([])
    const [selectedActivity, selectActivity] = useState<Activity | undefined>(undefined)
    const [editMode, setEditMode] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        activityStore.loadActivities()
    }, [activityStore])

    function handleCreateOrEditActivity (activity: Activity) {
        setSubmitting(true)
        if(activity.id) {
            agent.Activities.update(activity).then(() => {
                setActivities([...activities.filter(x => x.id !== activity.id), activity])
                selectActivity(activity)
                setEditMode(false)
                setSubmitting(false)
            })
        } else {
            activity.id = uuid()
            agent.Activities.create(activity).then(() => {
                setActivities([...activities, activity])
                selectActivity(activity)
                setEditMode(false)
                setSubmitting(false)
            })
        }
    }

    function handleDelete (id: string) {
        setSubmitting(true)
        agent.Activities.delete(id).then(() => {
            setActivities([...activities.filter(x => x.id !== id)])
            setSubmitting(false)
        })
    }

    if (activityStore.loadingInitial) return <Loading content="Loading app"/>

    return (
        <>
            <Navbar/>
            <Container style={{marginTop: '5em'}}>
                <ActivityDashboard 
                    activities={activityStore.activities}
                    createOrEdit={handleCreateOrEditActivity}
                    delete={handleDelete}
                    submitting={submitting}
                />
            </Container>
        </>
    )
}

export default observer(App)