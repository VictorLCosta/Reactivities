import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { List, Image, Popup } from 'semantic-ui-react';
import { Profile } from '../../../app/models/profile';
import ProfileCard from '../../profiles/ProfileCard';

import userPhoto from '../../../assets/user.png'

interface Props {
    attendees: Profile[]
}

const ActivityListItemAttendee = ({attendees}: Props) => {
    return (
        <List horizontal>
            {attendees.map(attendee => (
                <>
                    <Popup 
                        hoverable 
                        key={attendee.displayName}
                        trigger={
                            <List.Item key={attendee.username} as={Link} to={`/profile/${attendee.username}`}>
                                <Image size="mini" circular src={attendee.image || userPhoto}/>
                            </List.Item>
                        }
                    >
                        <Popup.Content>
                            <ProfileCard profile={attendee}/>
                        </Popup.Content>
                    </Popup>
                </>
            ))}
        </List>
    )
}

export default observer(ActivityListItemAttendee)