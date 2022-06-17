import axios from 'axios'
import { useEffect, useState } from 'react'
import { Container, Header, List } from 'semantic-ui-react'

import './styles.css'

import { Activity } from './../models/activity';
import Navbar from './Navbar';

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
                <ul>
                    {activities.map((el, i) => (
                        <List.Item key={i}>
                            {el.title}, {el.city}
                        </List.Item>
                    ))}
                </ul>
            </Container>
        </>
    )
}

export default App