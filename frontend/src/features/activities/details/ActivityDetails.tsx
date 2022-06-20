import { Button, Card, CardContent, Image } from 'semantic-ui-react';
import { Activity } from './../../../app/models/activity';
import moment from 'moment'

interface Props {
    activity: Activity | undefined,
    cancelSelectActivity: () => void,
    openForm: (id?: string) => void
}

const ActivityDetails = ({activity, cancelSelectActivity, openForm}: Props) => {
    if(activity) {
        return (
            <Card>
                <Image href={`/assets/categoryImages/${activity.category}.jpg`} />
                <CardContent>
                    <Card.Header>{activity.title}</Card.Header>
                    <Card.Meta>
                        <span>{moment(activity.date).format("dddd, MMMM DD yyyy")}</span>
                    </Card.Meta>
                    <Card.Description>
                        {activity.description}
                    </Card.Description>
                </CardContent>
                <CardContent extra>
                    <Button.Group widths="2">
                        <Button onClick={() => openForm(activity.id)} basic color="blue" content="Edit" />
                        <Button onClick={() => cancelSelectActivity()} basic color="grey" content="Cancel" />
                    </Button.Group>
                </CardContent>
            </Card>
        )
    }
    else {
        return <></>
    }
}

export default ActivityDetails