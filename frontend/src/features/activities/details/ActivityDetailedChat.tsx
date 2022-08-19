import { observer } from "mobx-react-lite"
import { Button, Header, Segment, Comment, Loader } from "semantic-ui-react"
import { useStore } from "../../../app/stores/store"
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import { Formik, Form, Field, FieldProps } from "formik";
import * as Yup from 'yup'

import userPng from '../../../assets/user.png'

interface Props {
    activityId: string
}

const ActivityDetailedChat = ({ activityId }: Props) => {
    const { commentStore } = useStore()

    useEffect(() => {
        if (activityId) {
            commentStore.createHubConnection(activityId)
        }
        return () => {
            commentStore.clearComments()
        }
    }, [commentStore, activityId])

    const validationSchema = Yup.object({
        body: Yup.string().required('The body is required'), 
    })

    return (
        <>
            <Segment
                textAlign='center'
                attached='top'
                inverted
                color='teal'
                style={{ border: 'none' }}
            >
                <Header>Chat about this event</Header>
            </Segment>
            <Segment attached clearing>
                <Comment.Group>
                    {commentStore.comments.map(comment => (
                        <Comment key={comment.id}>
                            <Comment.Avatar src={comment.image || userPng} />
                            <Comment.Content>
                                <Comment.Author as={Link} to={`/profiles/${comment.username}`}>
                                    {comment.displayName}
                                </Comment.Author>
                                <Comment.Metadata>
                                    <div>{comment.createdAt.toDateString()}</div>
                                </Comment.Metadata>
                                <Comment.Text>{comment.body}</Comment.Text>
                                <Comment.Actions>
                                    <Comment.Action>Reply</Comment.Action>
                                </Comment.Actions>
                            </Comment.Content>
                        </Comment>
                    ))}

                    <div style={{marginBottom: '25px'}}></div>

                    <Formik validationSchema={validationSchema} initialValues={{body: ''}} onSubmit={(values, {resetForm}) => commentStore.addComment(values).then(() => resetForm())}>
                        {({isSubmitting, isValid, handleSubmit}) => (
                            <Form className="ui form">
                                <Field name="body">
                                    {(props: FieldProps) => (
                                        <div style={{position: 'relative'}}>
                                            <Loader active={isSubmitting}/>
                                            <textarea
                                                placeholder="Enter your comment"
                                                rows={2}
                                                {...props.field}
                                                onKeyPress={e => {
                                                    if (e.key === 'Enter' && e.shiftKey) {
                                                        return;
                                                    }
                                                    if (e.key === "Enter" && !e.shiftKey) {
                                                        e.preventDefault()
                                                        isValid && handleSubmit()
                                                    }
                                                }}
                                            />
                                        </div>
                                    )}
                                </Field>
                            </Form>
                        )}
                    </Formik>

                </Comment.Group>
            </Segment>
        </>

    )
}

export default observer(ActivityDetailedChat)