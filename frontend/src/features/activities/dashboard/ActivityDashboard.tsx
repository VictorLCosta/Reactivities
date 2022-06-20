import { Grid } from "semantic-ui-react"
import ActivityList from './ActivityList';
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

import { Activity } from './../../../app/models/activity';

interface Props {
    activities: Activity[],
    selectedActivity: Activity | undefined,
    selectActivity: (id: string) => void,
    cancelSelectActivity: () => void
}

const ActivityDashboard = ({activities, selectedActivity, selectActivity, cancelSelectActivity}: Props) => {
    return (
        <Grid>
            <Grid.Column width="10">
                <ActivityList activities={activities} selectActivity={selectActivity}/>
            </Grid.Column>
            <Grid.Column width="6">
                {activities[0] &&
                <ActivityDetails activity={selectedActivity} cancelSelectActivity={cancelSelectActivity} />}
                <ActivityForm />
            </Grid.Column>
        </Grid>
    )
}

export default ActivityDashboard