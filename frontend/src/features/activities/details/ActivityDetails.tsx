import { Button, Card, CardContent, Image } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import moment from 'moment'

const ActivityDetails = (props: any) => {
    const { activityStore } = useStore()
    const { activity, openForm, cancelSelectedActivity } = activityStore

    if (!activity) return <></>;

    return (
        <Card fluid>
            <Image href={`/assets/categoryImages/${activity.category}`} fluid />
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
                    <Button onClick={() => cancelSelectedActivity()} basic color="grey" content="Cancel" />
                </Button.Group>
            </CardContent>
        </Card>
    )


}

export default observer(ActivityDetails)