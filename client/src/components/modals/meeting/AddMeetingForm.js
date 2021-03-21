import React from 'react'
import { Formik,Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../../actions/toDo';
import * as Yup from 'yup' 
import { Button, Header } from 'semantic-ui-react';
import * as dateFns from "date-fns";

export default function AddMeetingForm({toggleModal}) {

    const {loginData: {userId, access_token}} = useSelector(state => state.auth)
    
    let {selectedDate} = useSelector(state => state.selectedDate)

    const validationSchema = Yup.object(
    {
        date: Yup.date().required(),
        body: Yup.string().required(),
        link: Yup.string().required(),
    })

    const dispatch = useDispatch()
    return(
        <Formik
            validationSchema={validationSchema}
            initialValues={{
              body: '',
              date: dateFns.format(selectedDate,'yyyy-MM-dd'),
              userId: userId, 
              isDone: false,
              link:'' }}
            onSubmit={(values, { setSubmitting }) => {
                dispatch(addItem(values,access_token))
                toggleModal()
                setSubmitting(false)
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
            <Header as='h2' textAlign='center' content='Add a new meeting' />
            <Field 
             type="date"
             name="date"
           />
           <Field 
             style={{marginTop:"10px"}}
             as="textarea"
             name="body"
             rows="1"
             placeholder='Enter meeting title (Enter to submit, SHIFT + Enter to start a new line)'
             onKeyPress={e=>{
                if (e.key === 'Enter' && e.shiftKey) {
                    return
                } else if(e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    isValid && handleSubmit()
                }}}
           />
           <Field 
             style={{marginTop:"10px"}}
             as="textarea"
             rows="1"
             name="link"
             placeholder='Insert the link to meeting'
           />
           {errors.link && touched.link && errors.body}
           <Button style={{marginTop:"10px"}} positive type="submit" disabled={isSubmitting}>
             Submit
           </Button>
           <Button style={{marginTop:"10px"}} onClick={toggleModal} disabled={isSubmitting}>
             Cancel
           </Button>
         </Form>
       )}
        </Formik>
    )
}