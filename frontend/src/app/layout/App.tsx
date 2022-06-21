import axios from 'axios'
import { useEffect, useState } from 'react'
import { Container } from 'semantic-ui-react'
import Navbar from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';

import './styles.css'

import { Activity } from './../models/activity';

const App = (props: any) => {
    const [activities, setActivities] = useState<Activity[]>([])
    const [selectedActivity, selectActivity] = useState<Activity | undefined>(undefined)
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        axios.get<Activity[]>('https://localhost:5001/api/activities').then(resp => {
            setActivities(resp.data)
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
        activity.id 
        ? setActivities([...activities.filter(x => x.id !== activity.id), activity]) 
        : setActivities([...activities, {...activity, id: uuid()}])

        setEditMode(false)
        selectActivity(activity)
    }

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
                />
            </Container>
        </>
    )
}

export default App