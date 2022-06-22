import agent from '../api/agent';
import { useEffect, useState } from 'react'
import { Container } from 'semantic-ui-react'
import Navbar from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';

import './styles.css'

import { Activity } from './../models/activity';
import Loading from './Loading';

const App = (props: any) => {
    const [activities, setActivities] = useState<Activity[]>([])
    const [selectedActivity, selectActivity] = useState<Activity | undefined>(undefined)
    const [editMode, setEditMode] = useState(false)
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        agent.Activities.list().then(resp => {
            let activities: Activity[] = []
            resp.forEach(activity => {
                activity.date = activity.date.split('T')[0]
                activities.push(activity)
            })
            setActivities(activities)
            setLoading(false)
        })
    }, [])

    function handleSelectedActivity (id: string) {
        selectActivity(activities.find(x => x.id == id))
    }

    function handleCancelSelectActivity () {
        selectActivity(undefined)
    }

    function handleFormOpen (id?: string) {
        id ? handleSelectedActivity(id) : handleCancelSelectActivity()
        setEditMode(true)
    }

    function handleFormClose () {
        setEditMode(false)
    }

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
        setActivities([...activities.filter(x => x.id !== id)])
    }

    if (loading) return <Loading content="Loading app"/>

    return (
        <>
            <Navbar openForm={handleFormOpen} />
            <Container style={{marginTop: '5em'}}>
                <ActivityDashboard 
                    activities={activities}
                    selectedActivity={selectedActivity}
                    selectActivity={handleSelectedActivity}
                    cancelSelectActivity={handleCancelSelectActivity}
                    editMode={editMode}
                    openForm={handleFormOpen}
                    closeForm={handleFormClose}
                    createOrEdit={handleCreateOrEditActivity}
                    delete={handleDelete}
                    submitting={submitting}
                />
            </Container>
        </>
    )
}

export default App