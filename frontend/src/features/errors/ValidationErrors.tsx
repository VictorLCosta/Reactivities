import { Message } from "semantic-ui-react"
import { useEffect } from 'react';

interface Props {
    errors: any
}

const ValidationErrors = ({errors}: Props) => {
    useEffect(() => {
        console.log(errors)
    }, [])

    return (
        <Message error>
            {errors && (
                <Message.List>
                    {errors.map((err: string, key: any) => (
                        <Message.Item key={key}>{err}</Message.Item>
                    ))}
                </Message.List>
            )}
        </Message>
    )
}

export default ValidationErrors