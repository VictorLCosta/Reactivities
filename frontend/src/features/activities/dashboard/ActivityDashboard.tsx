import { Grid } from "semantic-ui-react"
import ActivityList from './ActivityList';
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

import { Activity } from './../../../app/models/activity';
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

interface Props {
    activities: Activity[],
    delete: (id: string) => void,
    submitting: boolean
}

const ActivityDashboard = ({activities, delete: deleteActivity, submitting}: Props) => {
    const {activityStore} = useStore()
    const {activity, editMode} = activityStore

    return (
        <Grid>
            <Grid.Column width="10">
                <ActivityList activities={activities} delete={deleteActivity} submitting={submitting}/>
            </Grid.Column>
            <Grid.Column width="6">
                {activity && !editMode &&
                    <ActivityDetails/>}
                {editMode && 
                    <ActivityForm/>
                }
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDashboard)