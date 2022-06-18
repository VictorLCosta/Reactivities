import { Grid } from "semantic-ui-react"
import ActivityList from './ActivityList';
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

import { Activity } from './../../../app/models/activity';

interface Props {
    activities: Activity[]
}

const ActivityDashboard = ({activities}: Props) => {
    return (
        <Grid>
            <Grid.Column width="10">
                <ActivityList activities={activities} />
            </Grid.Column>
            <Grid.Column width="6">
                {activities[0] &&
                <ActivityDetails activity={activities[0]} />}
                <ActivityForm />
            </Grid.Column>
        </Grid>
    )
}

export default ActivityDashboard