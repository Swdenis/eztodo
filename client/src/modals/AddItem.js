import React from 'react'
import { Formik,Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../actions';
import * as Yup from 'yup' 
import { Button, Header } from 'semantic-ui-react';
import history from '../history';
import * as dateFns from "date-fns";

export default function AddItem() {

    const {loginData: {userId, access_token}} = useSelector(state => state.auth)
    const {selectedDate} = useSelector(state => state.selectedDate)

    const validationSchema = Yup.object(
    {
        date: Yup.date().required(),
        body: Yup.string().required(),
    })

    const dispatch = useDispatch()
    return(
        <Formik
            validationSchema={validationSchema}
            initialValues={{ body: '', date: dateFns.format(selectedDate,'yyyy-MM-dd'), userId: userId, isDone: false }}
            onSubmit={(values, { setSubmitting }) => {
                dispatch(addItem(values,access_token))
                setSubmitting(false)
                history.push('/today')
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
             style={{marginTop:"10px"}}
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
           <Button style={{marginTop:"10px"}} positive type="submit" disabled={isSubmitting}>
             Submit
           </Button>
         </Form>
       )}
        </Formik>
    )
}