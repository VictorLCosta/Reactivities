import { Link } from "react-router-dom"
import { Segment, List, Item, Label, Image } from "semantic-ui-react"
import { Profile } from "../../../app/models/profile"

import userPhoto from '../../../assets/user.png'

interface Props {
    attendees: Profile[]
}

const ActivityDetailedSidebar = ({attendees}: Props) => {
    return (
        <>
            <Segment
                textAlign='center'
                style={{ border: 'none' }}
                attached='top'
                secondary
                inverted
                color='teal'
            >
                {attendees.length} {attendees.length == 1 ? 'Person' : 'People'} Going
            </Segment>
            <Segment attached>
                <List relaxed divided>
                    {attendees.map(attendee => (
                        <Item style={{ position: 'relative' }} key={attendee.username}>
                            <Label
                                style={{ position: 'absolute' }}
                                color='orange'
                                ribbon='right'
                            >
                                Host
                            </Label>
                            <Image size='tiny' src={attendee.image || userPhoto} />
                            <Item.Content verticalAlign='middle'>
                                <Item.Header as='h3'>
                                    <Link to={`/profiles/${attendee.username}`}>{attendee.displayName}</Link>
                                </Item.Header>
                                <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>
                            </Item.Content>
                        </Item>
                    ))}
                </List>
            </Segment>
        </>
    )
}

export default ActivityDetailedSidebar