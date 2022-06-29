import { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Item, Label } from "semantic-ui-react"
import { Activity } from "../../../app/models/activity"
import { useStore } from './../../../app/stores/store';
import moment from 'moment'

interface Props {
    activity: Activity
}

const ActivityListItem = ({activity}: Props) => {
    const {activityStore} = useStore()
    const {deleteActivity, loading} = activityStore

    const [target, setTarget] = useState('')

    function handleDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name)
        deleteActivity(id)
    }

    return (
        <Item key={activity.id}>
            <Item.Content>
                <Item.Header as='a'>{activity.title}</Item.Header>
                <Item.Meta>{moment(activity.date).format("dddd, MMMM DD yyyy")}</Item.Meta>
                <Item.Description>
                    <div>{activity.description}</div>
                    <div>{activity.city}, {activity.venue}</div>
                </Item.Description>
                <Item.Extra>
                    <Button as={Link} to={`/activities/${activity.id}`} floated='right' content="View" color="blue" />
                    <Button name={activity.id} loading={loading && target == activity.id} onClick={(e) => handleDelete(e, activity.id)} floated='right' content="Delete" color="red" />
                    <Label basic content={activity.category} />
                </Item.Extra>
            </Item.Content>
        </Item>
    )
}

export default ActivityListItem