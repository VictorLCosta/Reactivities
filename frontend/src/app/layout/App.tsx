import axios from 'axios'
import { useEffect, useState } from 'react'
import { Container, Header, List } from 'semantic-ui-react'

import './styles.css'

import { Activity } from './../models/activity';
import Navbar from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

const App = (props: any) => {
    const [activities, setActivities] = useState<Activity[]>([])

    useEffect(() => {
        axios.get<Activity[]>('https://localhost:5001/api/activities').then(resp => {
            setActivities(resp.data)
        })
    }, [])

    return (
        <>
            <Navbar/>
            <Container style={{marginTop: '5em'}}>
                <ActivityDashboard activities={activities} />
            </Container>
        </>
    )
}

export default App