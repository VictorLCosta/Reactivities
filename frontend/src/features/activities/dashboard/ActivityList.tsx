import { Button, Item, Label, Segment } from "semantic-ui-react"
import moment from 'moment'

import { Activity } from './../../../app/models/activity';

interface Props {
    activities: Activity[]
}

const ActivityList = ({activities}: Props) => {
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
                                <Button floated='right' content="View" color="blue" />
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