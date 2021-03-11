import React from 'react'
import { Formik,Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../actions';
import * as Yup from 'yup' 
import { Header } from 'semantic-ui-react';
import history from '../history';

export default function AddItem() {

    const {loginData: {userId, access_token}} = useSelector(state => state.auth)

    const validationSchema = Yup.object(
    {
        date: Yup.date().required(),
        body: Yup.string().required(),
    })

    const dispatch = useDispatch()
    return(
        <Formik
            validationSchema={validationSchema}
            initialValues={{ body: '', date: '', userId: userId }}
            onSubmit={(values, { setSubmitting }) => {
                dispatch(addItem(values,access_token))
                setSubmitting(false)
                console.log(values)
                history.push('/items')
            }
        }
        >
       {({
         errors,
         touched,
         handleSubmit,
         isSubmitting,
         isValid
       }) => (
         <Form className='ui form error' onSubmit={handleSubmit}>
            <Header as='h2' textAlign='center' content='Add new to-do item' />
            <Field
             type="date"
             name="date"
           />
           <Field 
             as="textarea"
             name="body"
             placeholder='Enter the text (Enter to submit, SHIFT + Enter to start a new line)'
             onKeyPress={e=>{
                if (e.key === 'Enter' && e.shiftKey) {
                    return
                } else if(e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    isValid && handleSubmit()
                }}}
           />
           {errors.email && touched.email && errors.email}
           {errors.password && touched.password && errors.password}
           <button type="submit" disabled={isSubmitting}>
             Submit
           </button>
         </Form>
       )}
        </Formik>
    )
}