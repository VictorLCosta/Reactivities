import { Button, Card, CardContent, Image } from 'semantic-ui-react';
import { Activity } from './../../../app/models/activity';
import moment from 'moment'

interface Props {
    activity: Activity
}

const ActivityDetails = ({activity}: Props) => {
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
                    <Button basic color="blue" content="Edit" />
                    <Button basic color="blue" content="Edit" />
                </Button.Group>
            </CardContent>
        </Card>
    )
}

export default ActivityDetails