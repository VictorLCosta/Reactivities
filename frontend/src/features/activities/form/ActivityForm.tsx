import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { Button, Segment } from "semantic-ui-react"
import { useStore } from "../../../app/stores/store"
import { v4 as uuid } from "uuid"
import { Link } from "react-router-dom"
import { Formik, Form } from "formik"
import * as Yup from 'yup'
import MyTextInput from "../../../app/common/form/MyTextInput"
import MyDateInput from './../../../app/common/form/MyDateInput';
import MyTextArea from "../../../app/common/form/MyTextarea"
import MySelectInput from "../../../app/common/form/MySelectInput"
import { categoryOptions } from "../../../app/common/options/categoryOptions"
import { Activity } from './../../../app/models/activity';

const ActivityForm = () => {
    const history = useHistory()
    const {activityStore} = useStore()
    const {loadActivity, createActivity, updateActivity, loading} = activityStore
    const {id} = useParams<{id: string}>()

    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: null,
        city: '',
        venue: ''
    })

    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required'),
        date: Yup.date().required("The activity date is required"),
        description: Yup.string().required('The description title is required'),
        category: Yup.string().required('The activity category is required'),
        city: Yup.string().required('The activity city is required'),
        venue: Yup.string().required('The activity venue is required')   
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
                        <MyTextInput placeholder="Title" name="title"/>
                        <MyTextArea placeholder="Description" name="description" />
                        <MySelectInput options={categoryOptions} placeholder="Category" name="category" />
                        <MyDateInput name="date" placeholderText="Date" showTimeSelect timeCaption="time" dateFormat="MMMM d, yyyy h:mm aa" />
                        <MyTextInput placeholder="City" name="city" />
                        <MyTextInput placeholder="Venue" name="venue" />
                        <Button loading={loading} floated="right" positive type="submit" content="Submit" />
                        <Button as={Link} to="/activities" floated="right" type="button" content="Cancel" />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
}

export default observer(ActivityForm)