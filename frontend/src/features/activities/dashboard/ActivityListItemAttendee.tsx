import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { List, Image } from 'semantic-ui-react';
import { Profile } from '../../../app/models/profile';

import userPhoto from '../../../assets/user.png'

interface Props {
    attendees: Profile[]
}

const ActivityListItemAttendee = ({attendees}: Props) => {
    return (
        <List horizontal>
            {attendees.map(attendee => (
                <List.Item key={attendee.username} as={Link} to={`/profiles/${attendee.username}`}>
                    <Image size="mini" circular src={attendee.image || userPhoto}/>
                </List.Item>
            ))}
        </List>
    )
}

export default observer(ActivityListItemAttendee)