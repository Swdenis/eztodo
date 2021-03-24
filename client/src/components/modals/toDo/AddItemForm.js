import React, { useEffect, useState } from 'react'
import { Formik,Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, updateItem } from '../../../actions/toDo';
import * as Yup from 'yup' 
import { Button, Header } from 'semantic-ui-react';
import * as dateFns from "date-fns";
import MyTextArea from '../../common/MyTextArea';

export default function AddItemForm({toggleModal}) {

    const {loginData: {userId, access_token}} = useSelector(state => state.auth)
    const {selectedDate} = useSelector(state => state.selectedDate)
    const {item} = useSelector(state => state.itemToEdit)

    const INITIAL_VALUES = {
      body: '',
      date: dateFns.format(selectedDate,'yyyy-MM-dd'),
      userId: userId, 
      isDone: false,
      link:'',
      isDeadline:'',
      time:''
      }


    const dispatch = useDispatch()

    const [initialValues, setInitialValues] = useState(INITIAL_VALUES)
    const [action, setAction] = useState(()=>addItem)
    
    useEffect(()=>{
      if(item) {
        setInitialValues(item)
        setAction(()=>updateItem)
    }},[item])

    const validationSchema = Yup.object(
    {
        date: Yup.date().required(),
        body: Yup.string().required()
    })

    return(
        <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={
              ( values, { setSubmitting }) => {
                dispatch(action(values,access_token))
                toggleModal()
                setSubmitting(false)
            }}
            enableReinitialize={true}
        >
       {({
         errors,
         touched,
         handleSubmit,
         isSubmitting,
         isValid
       }) => (
         <Form className='ui form error' onSubmit={handleSubmit}>
            <Header as='h2' textAlign='center' content='' />
            <Field 
             type="date"
             name="date"
             placeholder={initialValues.date}
           />
           <MyTextArea 
             style={{marginTop:'10px'}}
             as="textarea"
             name="body"
             rows="1"
             placeholder="Enter the text (Enter to submit, SHIFT + Enter to start a new line)"
             onChange={(e) => setInitialValues({...initialValues,body: e.target.value})}
             value={initialValues.body}
             onKeyPress={e=>{
                if (e.key === 'Enter' && e.shiftKey) {
                    return
                } else if(e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    isValid && handleSubmit()
                }}}   
           />
           {errors.body && touched.date && errors.date}
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