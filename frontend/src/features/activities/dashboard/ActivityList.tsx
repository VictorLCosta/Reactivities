import { Button, Item, Label, Segment } from "semantic-ui-react"
import moment from 'moment'

import { SyntheticEvent, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

const ActivityList = () => {
    const {activityStore} = useStore()
    const {activitiesByDate, deleteActivity, loading} = activityStore

    const [target, setTarget] = useState('')

    function handleDelete (event: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(event.currentTarget.name)
        deleteActivity(id)
    }

    return (
        <Segment>
            <Item.Group divided>
                {activitiesByDate.map(item => (
                    <Item key={item.id}>
                        <Item.Content>
                            <Item.Header as='a'>{item.title}</Item.Header>
                            <Item.Meta>{moment(item.date).format("dddd, MMMM DD yyyy")}</Item.Meta>
                            <Item.Description>
                                <div>{item.description}</div>
                                <div>{item.city}, {item.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button as={Link} to={`/activities/${item.id}`} floated='right' content="View" color="blue" />
                                <Button name={item.id} loading={loading && target == item.id} onClick={(e) => handleDelete(e, item.id)} floated='right' content="Delete" color="red" />
                                <Label basic content={item.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}

export default observer(ActivityList)