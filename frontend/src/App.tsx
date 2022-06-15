import { useEffect, useState } from 'react'
import axios from 'axios'

const App = (props: any) => {
    const [activities, setActivities] = useState([])

    useEffect(() => {
        axios.get('https://localhost:5001/api/activities').then(resp => {
            setActivities(resp.data)
        })
    }, [])

    return (
        <div>
            <ul>
                {activities.map((el: any, i) => (
                    <li key={i}>
                        {el.title}, {el.city}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default App