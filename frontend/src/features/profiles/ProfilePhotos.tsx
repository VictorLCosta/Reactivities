import { observer } from "mobx-react-lite";
import { Card, Header, Tab, Image, Grid, Button } from "semantic-ui-react"
import { Photo, Profile } from "../../app/models/profile"
import { useStore } from './../../app/stores/store';
import { SyntheticEvent, useState } from 'react';
import PhotoUploadWidget from "../../app/common/imageUpload/PhotoUploadWidget";

interface Props {
    profile: Profile
}

const ProfilePhotos = ({ profile }: Props) => {
    const { profileStore: { isCurrentUser, uploadPhoto, uploading, loading, setMainPhoto } } = useStore()
    const [addPhotoMode, setAddPhotoMode] = useState(false)
    const [target, setTarget] = useState('')

    function handlePhotoUpload (file: Blob) {
        uploadPhoto(file).then(() => setAddPhotoMode(false))
    }

    function handleSetMainPhoto (photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {
        setTarget(e.currentTarget.name)
        setMainPhoto(photo)
    }

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
                        <PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading={uploading} />
                    ) : (
                        <Card.Group>
                            {profile.photos?.map((photo, i) => (
                                <Card key={i}>
                                    <Image src={photo.url} />
                                    {isCurrentUser && (
                                        <Button.Group fluid widths={2}>
                                            <Button
                                                basic
                                                color="green"
                                                content="Main"
                                                name={photo.publicId}
                                                disabled={photo.isMain}
                                                loading={target === photo.publicId && loading}
                                                onClick={e => handleSetMainPhoto(photo, e)}
                                            />
                                            <Button basic color="red" icon="trash"/>
                                        </Button.Group>
                                    )}
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