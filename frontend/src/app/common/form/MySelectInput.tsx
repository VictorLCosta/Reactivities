import { useField } from "formik"
import { Form, Label, Select } from "semantic-ui-react"

interface Props {
    placeholder: string,
    name: string,
    options: any,
    label?: string
}

const MySelectInput = ({placeholder, name, options, label}: Props) => {
    const [field, meta, helpers] = useField(name)
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{label}</label>
            <Select
                clearable
                value={field.value || null}
                options={options}
                placeholder={placeholder}
                onChange={(e, d) => helpers.setValue(d.value)}
                onBlur={() => helpers.setTouched(true)}
            />
            {meta.touched && meta.error ? (
                <Label basic color="red" pointing content={meta.error}/>
            ) : null}
        </Form.Field>
    )
}

export default MySelectInput