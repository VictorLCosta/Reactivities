import { Container } from 'semantic-ui-react'
import Navbar from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import TestErrors from '../../features/errors/TestError';
import NotFound from '../../features/errors/NotFound';
import { ToastContainer } from 'react-toastify';
import ServerError from '../../features/errors/ServerError';
import LoginForm from '../../features/users/LoginForm';

import './styles.css'

import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router';
import { Switch } from 'react-router-dom';
import { useStore } from '../stores/store';
import { useEffect } from 'react';
import Loading from './Loading';
import ModalContainer from '../common/modals/ModalContainer';
import ProfilePage from './../../features/profiles/ProfilePage';
import PrivateRoute from './PrivateRoute';

const App = () => {
    const location = useLocation()
    const {commonStore, userStore} = useStore()

    useEffect(() => {
        if (commonStore.token) {
            userStore.getUser().finally(() => commonStore.setAppLoaded())
        } else {
            userStore.getFacebookLoginStatus().then(() => commonStore.setAppLoaded())
        }
    }, [commonStore, userStore])

    if(!commonStore.appLoaded) return <Loading content="Loading component..."/>

    return (
        <>
            <ToastContainer position="bottom-right" hideProgressBar/>
            <ModalContainer />
            <Route path="/" exact component={HomePage}/>
            <Route 
                path="/(.+)"
                render={() => (
                    <>
                        <Navbar/>
                        <Container style={{marginTop: '5em'}}>
                            <Switch>
                                <PrivateRoute path="/activities" exact component={ActivityDashboard}/>
                                <PrivateRoute path="/activities/:id" component={ActivityDetails}/>
                                <PrivateRoute key={location.key} path={["/createActivity", "/manage/:id"]} component={ActivityForm}/>
                                <PrivateRoute path="/profile/:username" component={ProfilePage}/>
                                <PrivateRoute path="/errors" component={TestErrors}/>
                                <Route path="/server-error" component={ServerError}/>
                                <Route component={NotFound}/>
                            </Switch>
                        </Container>
                    </>
                )}
            />
        </>
    )
}

export default observer(App)