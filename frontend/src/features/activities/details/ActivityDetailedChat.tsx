import { observer } from "mobx-react-lite"
import { Button, Form, Header, Segment, Comment } from "semantic-ui-react"
import { useStore } from "../../../app/stores/store"
import { useEffect } from 'react';

import userPng from '../../../assets/user.png'
import { Link } from "react-router-dom";

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
            <Segment attached>
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

                    <Form reply>
                        <Form.TextArea />
                        <Button
                            content='Add Reply'
                            labelPosition='left'
                            icon='edit'
                            primary
                        />
                    </Form>
                </Comment.Group>
            </Segment>
        </>

    )
}

export default observer(ActivityDetailedChat)