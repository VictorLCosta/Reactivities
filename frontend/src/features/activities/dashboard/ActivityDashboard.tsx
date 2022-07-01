import { Grid } from "semantic-ui-react"
import ActivityList from './ActivityList';
import Loading from "../../../app/layout/Loading";
import ActivityFilters from "./ActivityFilters";

import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

const ActivityDashboard = () => {
    const {activityStore} = useStore()
    const {activityRegistry, loadActivities} = activityStore

    useEffect(() => {
        if (activityRegistry.size === 0) loadActivities()
    }, [activityStore])

    if (activityStore.loadingInitial) return <Loading content="Loading app"/>

    return (
        <Grid>
            <Grid.Column width="10">
                <ActivityList/>
            </Grid.Column>
            <Grid.Column width="6">
                <ActivityFilters/>
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDashboard)