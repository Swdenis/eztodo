import React, { useEffect } from 'react'
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { signIn, tryLogIn } from '../actions';
import * as Yup from 'yup' 
import { Button, Container, Header, Segment } from 'semantic-ui-react';
import history from '../history'
import MyTextInput from './MyTextInput';

export default function Login() {

    const {loginData} = useSelector(state => state.auth)
    
    const validationSchema = Yup.object(
    {
        email: Yup.string().required(),
        password: Yup.string().required(),
    })

    const dispatch = useDispatch()

    useEffect(()=>{
          if(loginData) {
            if(loginData.success === true) {
                dispatch(signIn(loginData.userId))
                history.push('/today')
        }}
        },[loginData,dispatch])
   
        return(
        <Container textAlign='center' text className='masthead'>
        <Formik
            validationSchema={validationSchema}
            initialValues={{ email: 'test@test.com', password: 'test123' }}
            onSubmit={(values, { setSubmitting }) => {
                dispatch(tryLogIn(values))
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
         <Form className='ui form' onSubmit={handleSubmit}>
            <Header as='h2' textAlign='center' content='Login to app' />
            <MyTextInput name='email' placeholder='Email' />
            <MyTextInput name= 'password' placeholder='Password' type='password' />
           {errors.email && touched.email && errors.email}
           {errors.password && touched.password && errors.password}
           <Button positive type="submit" disabled={isSubmitting}>
             Log in
           </Button>
         </Form>
       )}
        </Formik>
      </Container>
    )
}
    
