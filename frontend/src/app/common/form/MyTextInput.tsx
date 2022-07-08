import { useField } from "formik"
import { Form, Label } from "semantic-ui-react"

interface Props {
    placeholder: string,
    name: string,
    label?: string
}

const MyTextInput = ({placeholder, name, label}: Props) => {
    const [field, meta] = useField(name)
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{label}</label>
            <input {...field} placeholder={placeholder} name={name}/>
            {meta.touched && meta.error ? (
                <Label basic color="red" pointing content={meta.error}/>
            ) : null}
        </Form.Field>
    )
}

export default MyTextInput