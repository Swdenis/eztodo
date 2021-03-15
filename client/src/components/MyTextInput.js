import { useField } from 'formik'
import React from 'react'
import { Form, FormGroup, Label } from 'semantic-ui-react'

export default function MyTextInput(props) {
    const [field, meta] = useField(props.name)
    return(
        <FormGroup>
            <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <input {...field} {...props}/>
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}
            </Form.Field>
        </FormGroup>
        
    )

}