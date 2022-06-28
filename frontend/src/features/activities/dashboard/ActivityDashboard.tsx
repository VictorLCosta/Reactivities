import { Grid } from "semantic-ui-react"
import ActivityList from './ActivityList';
import Loading from "../../../app/layout/Loading";

import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

const ActivityDashboard = () => {
    const {activityStore} = useStore()

    useEffect(() => {
        activityStore.loadActivities()
    }, [activityStore])

    if (activityStore.loadingInitial) return <Loading content="Loading app"/>

    return (
        <Grid>
            <Grid.Column width="10">
                <ActivityList/>
            </Grid.Column>
            <Grid.Column width="6">
                <h2>Activity filters</h2>
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDashboard)