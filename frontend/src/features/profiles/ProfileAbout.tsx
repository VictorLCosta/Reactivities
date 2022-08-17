import { Button, Form, Grid, Header, Tab } from "semantic-ui-react"
import { Profile } from "../../app/models/profile"
import { useStore } from './../../app/stores/store';
import { useState } from 'react';
import { Formik } from "formik";
import * as Yup from 'yup';

import MyTextInput from "../../app/common/form/MyTextInput";
import MyTextArea from "../../app/common/form/MyTextarea";

const ProfileAbout = () => {
    const {profileStore: {isCurrentUser, editProfile, loading, profile}} = useStore()
    const [editMode, setEditMode] = useState(false)

    const bioStyle = {
        whiteSpace: 'pre-wrap' as 'pre-wrap',
        fontWeight: 600
    }

    const validationSchema = Yup.object({
        displayName: Yup.string().required('The display name is required'),
    })

    function handleFormSubmit (profile: Partial<Profile>) {
        editProfile(profile).then(() => {
            setEditMode(false)
        })
    }

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated="left" icon="user" content="About"/>
                    {isCurrentUser && (
                        <Button
                            basic
                            content="Edit Profile"
                            floated="right"
                            onClick={() => setEditMode(!editMode)}
                        />
                    )}
                </Grid.Column>
                <Grid.Column width={16}>
                    {editMode ? (
                        <Formik validationSchema={validationSchema} initialValues={{displayName: profile?.displayName, bio: profile?.bio}} onSubmit={values => handleFormSubmit(values)}>
                            {({handleSubmit, isSubmitting, isValid, dirty}) => (
                                <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                                    <MyTextInput name="displayName" placeholder="Display Name"/>
                                    <MyTextArea name="bio" placeholder="Add your bio"/>

                                    <Button 
                                        disabled={isSubmitting || !dirty || !isValid}
                                        loading={loading} 
                                        positive 
                                        content="Update Profile" 
                                        type="submit" 
                                        floated="right"
                                    />
                                </Form>
                            )}
                        </Formik>
                    ): (
                        <span style={bioStyle}>
                            {profile?.bio}
                        </span>
                    )}
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
}

export default ProfileAbout