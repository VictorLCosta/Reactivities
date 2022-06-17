import { Grid } from "semantic-ui-react"
import ActivityList from './ActivityList';

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
        </Grid>
    )
}

export default ActivityDashboard