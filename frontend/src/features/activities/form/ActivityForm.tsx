import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { Button, FormField, Label, Segment } from "semantic-ui-react"
import { useStore } from "../../../app/stores/store"
import { v4 as uuid } from "uuid"
import { Link } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from 'yup'

const ActivityForm = () => {
    const history = useHistory()
    const {activityStore} = useStore()
    const {loadActivity, createActivity, updateActivity, loading} = activityStore
    const {id} = useParams<{id: string}>()

    const [activity, setActivity] = useState({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    })

    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required')

    })

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!))
    }, [id, loadActivity])

    /*function handleSubmit() {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`))
        } else {
            updateActivity(activity).then(() => history.push(`/activities/${activity.id}`))
        }
    }

    function handleInputChange (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target
        setActivity({...activity, [name]: value})
    }*/

    return (
        <Segment clearing>
            <Formik validationSchema={validationSchema} enableReinitialize initialValues={activity} onSubmit={values => console.log(values)}>
                {({ handleSubmit }) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                        <FormField>
                            <Field placeholder="Title" name="title" />
                            <ErrorMessage name="title" render={error => <Label basic color="red" pointing content={error}/>}/>
                        </FormField>

                        <Field placeholder="Description" name="description" />
                        <Field placeholder="Category" name="category" />
                        <Field type="date" placeholder="Date" name="date" />
                        <Field placeholder="City" name="city" />
                        <Field placeholder="Venue" name="venue" />
                        <Button loading={loading} floated="right" positive type="submit" content="Submit" />
                        <Button as={Link} to="/activities" floated="right" type="button" content="Cancel" />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
}

export default observer(ActivityForm)