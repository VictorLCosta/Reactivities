import { Card , Icon, Image} from 'semantic-ui-react';
import { Profile } from './../../app/models/profile';
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom';

import userPhoto from '../../assets/user.png'

interface Props {
    profile: Profile
}

const ProfileCard = ({profile}: Props) => {
    return (
        <Card as={Link} to={`/profiles/${profile.username}`}>
            <Image src={profile.image || userPhoto}/>
            <Card.Content>
                <Card.Header>{profile.displayName}</Card.Header>
                <Card.Description>{profile.bio?.substring(0, 40) + '...'}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Icon name='user'/>
                {profile.followerCount} followers
            </Card.Content>
        </Card>
    )
}

export default observer(ProfileCard)