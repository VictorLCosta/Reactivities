import { Container } from 'semantic-ui-react'
import Navbar from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';

import './styles.css'

import { observer } from 'mobx-react-lite';
import { Route } from 'react-router';

const App = () => {
    return (
        <>
            <Navbar/>
            <Container style={{marginTop: '5em'}}>
                <Route path="/" exact component={HomePage}/>
                <Route path="/activities" exact component={ActivityDashboard}/>
                <Route path="/activities/:id" component={ActivityDashboard}/>
                <Route path="/createActivity" component={ActivityForm}/>
            </Container>
        </>
    )
}

export default observer(App)