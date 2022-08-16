import { observer } from "mobx-react-lite";
import { Card, Header, Tab, Image, Grid, Button } from "semantic-ui-react"
import { Profile } from "../../app/models/profile"
import { useStore } from './../../app/stores/store';
import { useState } from 'react';

interface Props {
    profile: Profile
}

const ProfilePhotos = ({ profile }: Props) => {
    const { profileStore: { isCurrentUser } } = useStore()
    const [addPhotoMode, setAddPhotoMode] = useState(false)

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated="left" icon="image" content="Photos" />
                    {isCurrentUser && (
                        <Button
                            floated="right"
                            basic
                            content={addPhotoMode ? 'Cancel' : 'Add Photo'}
                            onClick={() => setAddPhotoMode(!addPhotoMode)}
                        />
                    )}
                </Grid.Column>
                <Grid.Column width={16}>
                    {addPhotoMode ? (
                        <p>Photo widget goes here!</p>
                    ) : (
                        <Card.Group>
                            {profile.photos?.map((photo, i) => (
                                <Card key={i}>
                                    <Image src={photo.url} />
                                </Card>
                            ))}
                        </Card.Group>
                    )}
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
}

export default observer(ProfilePhotos)