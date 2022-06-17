import { Grid, List } from "semantic-ui-react"
import { Activity } from './../../../app/models/activity';

interface Props {
    activities: Activity[]
}

const ActivityDashboard = ({activities}: Props) => {
    return (
        <Grid>
            <Grid.Column width="10">
                <List>
                    {activities.map((el, i) => (
                        <List.Item key={i}>
                            {el.title}, {el.city}
                        </List.Item>
                    ))}
                </List>
            </Grid.Column>
        </Grid>
    )
}

export default ActivityDashboard