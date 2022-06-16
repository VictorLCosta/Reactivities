import axios from 'axios'
import { useEffect, useState } from 'react'
import { Header, List } from 'semantic-ui-react'

import './styles.css'

import { Activity } from './../models/activity';

const App = (props: any) => {
    const [activities, setActivities] = useState<Activity[]>([])

    useEffect(() => {
        axios.get<Activity[]>('https://localhost:5001/api/activities').then(resp => {
            setActivities(resp.data)
        })
    }, [])

    return (
        <div>
            <Header as="h2" icon="users" content="Reactivities" color="violet"/>
            <ul>
                {activities.map((el, i) => (
                    <List.Item key={i}>
                        {el.title}, {el.city}
                    </List.Item>
                ))}
            </ul>
        </div>
    )
}

export default App