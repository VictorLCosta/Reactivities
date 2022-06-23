import { Button, Item, ItemHeader, Label, Segment } from "semantic-ui-react"
import moment from 'moment'

import { Activity } from './../../../app/models/activity';
import { SyntheticEvent, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

interface Props {
    activities: Activity[],
    delete: (id: string) => void,
    submitting: boolean
}

const ActivityList = ({activities, delete: deleteActivity, submitting}: Props) => {
    const {activityStore} = useStore()
    const [target, setTarget] = useState('')

    function handleDelete (event: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(event.currentTarget.name)
        deleteActivity(id)
    }

    return (
        <Segment>
            <Item.Group divided>
                {activities.map(item => (
                    <Item key={item.id}>
                        <Item.Content>
                            <Item.Header as='a'>{item.title}</Item.Header>
                            <Item.Meta>{moment(item.date).format("dddd, MMMM DD yyyy")}</Item.Meta>
                            <Item.Description>
                                <div>{item.description}</div>
                                <div>{item.city}, {item.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => activityStore.selectActivity(item.id)} floated='right' content="View" color="blue" />
                                <Button name={item.id} loading={submitting && target == item.id} onClick={(e) => handleDelete(e, item.id)} floated='right' content="Delete" color="red" />
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