import { useField } from "formik"
import { Form, Label } from "semantic-ui-react"

interface Props {
    name: string,
    placeholder: string
}

const MyTextArea = (props: Props) => {
    const [field, meta] = useField(props.name)
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <textarea {...field} {...props}></textarea>
            {meta.touched && meta.error ? (
                <Label basic color="red" pointing content={meta.error}/>
            ) : null}
        </Form.Field>
    )
}

export default MyTextArea