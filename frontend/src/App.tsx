import axios from 'axios'
import { useEffect, useState } from 'react'
import { Header, List } from 'semantic-ui-react'

const App = (props: any) => {
    const [activities, setActivities] = useState([])

    useEffect(() => {
        axios.get('https://localhost:5001/api/activities').then(resp => {
            setActivities(resp.data)
        })
    }, [])

    return (
        <div>
            <Header as="h2" icon="users" content="Reactivities" color="violet"/>
            <ul>
                {activities.map((el: any, i) => (
                    <List.Item key={i}>
                        {el.title}, {el.city}
                    </List.Item>
                ))}
            </ul>
        </div>
    )
}

export default App