import { useEffect } from 'react'
import { Container } from 'semantic-ui-react'
import Navbar from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

import './styles.css'

import Loading from './Loading';

import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';


const App = (props: any) => {
    const {activityStore} = useStore()

    useEffect(() => {
        activityStore.loadActivities()
    }, [activityStore])

    if (activityStore.loadingInitial) return <Loading content="Loading app"/>

    return (
        <>
            <Navbar/>
            <Container style={{marginTop: '5em'}}>
                <ActivityDashboard/>
            </Container>
        </>
    )
}

export default observer(App)