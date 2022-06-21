import { Button, Item, Label, Segment } from "semantic-ui-react"
import moment from 'moment'

import { Activity } from './../../../app/models/activity';

interface Props {
    activities: Activity[],
    selectActivity: (id: string) => void,
    delete: (id: string) => void
}

const ActivityList = ({activities, selectActivity, delete: deleteActivity}: Props) => {
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
                                <Button onClick={() => selectActivity(item.id)} floated='right' content="View" color="blue" />
                                <Button onClick={() => deleteActivity(item.id)} floated='right' content="Delete" color="red" />
                                <Label basic content={item.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}

export default ActivityList