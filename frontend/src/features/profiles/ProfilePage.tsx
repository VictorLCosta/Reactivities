import { Grid } from "semantic-ui-react"
import ProfileContent from "./ProfileContent"
import ProfileHeader from "./ProfileHeader"
import { observer } from 'mobx-react-lite';
import { useParams } from "react-router-dom";
import { useStore } from './../../app/stores/store';
import { useEffect } from 'react';
import Loading from "../../app/layout/Loading";

const ProfilePage = () => {
    const {username} = useParams<{username: string}>()
    const {profileStore} = useStore()

    const {loadingProfile, loadProfile, profile, setActiveTab} = profileStore

    useEffect(() => {
        loadProfile(username)
        return () => {
            setActiveTab(0)
        }
    }, [loadProfile, username])

    if (loadingProfile) return <Loading content="Loading profile..."/>

    return (
        <Grid>
            <Grid.Column width={16}>
                {profile && <>
                    <ProfileHeader profile={profile} />
                    <ProfileContent profile={profile} />
                </>}
            </Grid.Column>
        </Grid>
    )
}

export default observer(ProfilePage)