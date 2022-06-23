import agent from '../api/agent';
import { useEffect, useState } from 'react'
import { Container } from 'semantic-ui-react'
import Navbar from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

import './styles.css'

import { Activity } from './../models/activity';
import Loading from './Loading';

import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';


const App = (props: any) => {
    const {activityStore} = useStore()

    const [activities, setActivities] = useState<Activity[]>([])
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        activityStore.loadActivities()
    }, [activityStore])

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
                    delete={handleDelete}
                    submitting={submitting}
                />
            </Container>
        </>
    )
}

export default observer(App)