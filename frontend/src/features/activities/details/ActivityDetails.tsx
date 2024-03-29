import { useParams } from 'react-router';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedSidebar from './ActivityDetailedSidebar';

import Loading from '../../../app/layout/Loading';

const ActivityDetails = () => {
    const { activityStore } = useStore()
    const { activity, loadActivity, loadingInitial, clearSelectedActivity } = activityStore
    const {id} = useParams<{id: string}>()

    useEffect(() => {
        if (id) loadActivity(id)
        return () => clearSelectedActivity()
    }, [id, loadActivity, clearSelectedActivity])

    if (loadingInitial || !activity) return <Loading/>;

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailedHeader activity={activity}/>
                <ActivityDetailedInfo activity={activity}/>
                <ActivityDetailedChat activityId={activity.id}/>
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailedSidebar activity={activity}/>
            </Grid.Column>
        </Grid>
    )


}

export default observer(ActivityDetails)