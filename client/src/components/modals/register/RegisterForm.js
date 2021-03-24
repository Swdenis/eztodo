import React, {  } from 'react'
import { Formik,Form } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup' 
import { Button } from 'semantic-ui-react';
import { trySignUp } from '../../../actions/login';
import MyTextInput from '../../common/MyTextInput';

export default function RegisterForm({toggleModal}) {

    const dispatch = useDispatch()

    const validationSchema = Yup.object(
    {
        email: Yup.string().required(),
        password: Yup.string().required()
    })


    return(
        <Formik
            validationSchema={validationSchema}
            initialValues={{email:'',password:''}}
            enableReinitialize={true}
            onSubmit={
              ( values, { setSubmitting }) => {
                dispatch(trySignUp(values))
                toggleModal()
                setSubmitting(false)
            }
        }
        >
       {({
         handleSubmit,
         isSubmitting,
         isValid
       }) => (
         <Form className='ui form error' onSubmit={handleSubmit}>
           <MyTextInput 
             style={{marginTop:'10px'}}
             name="email"
             placeholder="Email"
           />
           <MyTextInput 
             name="password"
             placeholder="Password"
           />
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