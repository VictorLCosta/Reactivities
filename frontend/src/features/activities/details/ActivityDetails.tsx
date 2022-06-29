import { useParams } from 'react-router';
import { Button, Card, CardContent, Image } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import moment from 'moment'

import Loading from '../../../app/layout/Loading';

const ActivityDetails = (props: any) => {
    const { activityStore } = useStore()
    const { activity, loadActivity, loadingInitial } = activityStore
    const {id} = useParams<{id: string}>()

    useEffect(() => {
        if (id) loadActivity(id)
    }, [id, loadActivity])

    if (loadingInitial || !activity) return <Loading/>;

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
                    <Button as={Link} to={`/manage/${activity.id}`} basic color="blue" content="Edit" />
                    <Button basic color="grey" content="Cancel" />
                </Button.Group>
            </CardContent>
        </Card>
    )


}

export default observer(ActivityDetails)