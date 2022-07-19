import { ErrorMessage, Form, Formik } from "formik"
import { observer } from "mobx-react-lite"
import { Button, Header, Label } from "semantic-ui-react"
import MyTextInput from "../../app/common/form/MyTextInput"
import { useStore } from "../../app/stores/store"
import * as Yup from 'yup'

const RegisterForm = () => {
    const {userStore} = useStore()

    const validationSchema = Yup.object({
        displayName: Yup.string().required(),
        username: Yup.string().required(),
        email: Yup.string().required().email(),
        password: Yup.string().required()
    })

    const initialValues = {

    }

    return (
        <Formik validationSchema={validationSchema} initialValues={{displayName: "", username: "", email: "", password: "", error: null}} onSubmit={(values, {setErrors}) => userStore.register(values).catch(err => setErrors({error: "Invalid email or password"}))}>
            {({handleSubmit, isSubmitting, errors, dirty, isValid}) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                    <Header as="h2" content="Login to Reactivities" color="teal" textAlign="center"/>
                    <MyTextInput name="displayName" placeholder="Display Name"/>
                    <MyTextInput name="username" placeholder="Username"/>
                    <MyTextInput name="email" placeholder="Email"/>
                    <MyTextInput name="password" placeholder="Password" type="password"/>
                    <ErrorMessage 
                        name="error" 
                        render={() => <Label style={{marginBottom: 10}} basic color="red" content={errors.error}/>}
                    />
                    <Button disabled={!isValid || !dirty || isSubmitting} loading={isSubmitting} positive content="Login" type="submit" fluid/>
                </Form>
            )}
        </Formik>
    )
}

export default observer(RegisterForm)