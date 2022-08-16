import { Card, Header, Tab, Image } from "semantic-ui-react"
import { Profile } from "../../app/models/profile"

interface Props {
    profile: Profile
}

const ProfilePhotos = ({profile}: Props) => {
    return (
        <Tab.Pane>
            <Header icon="image" content="Photos"/>
            <Card.Group>
                {profile.photos?.map((photo, i) => (
                    <Card key={i}>
                        <Image src={photo.url} />
                    </Card>
                ))}
            </Card.Group>
        </Tab.Pane>
    )
}

export default ProfilePhotos