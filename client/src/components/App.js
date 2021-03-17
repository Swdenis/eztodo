import React from 'react'
import {Router, Route} from 'react-router'
import { Container } from 'semantic-ui-react'
import NavBar from './navigation/NavBar'
import history from '../history'
import AddItem from './AddItem'
import PrivateRoute from './navigation/PrivateRoute'
import Login from './Login'
import { ToastContainer } from 'react-toastify'
import '../App.css' 
import Month from './calendar/Month'
import Week from './calendar/Week'
import Today from './calendar/Today'

export default function App() {
    return(
        <>
        <Router history={history} >
        <ToastContainer position='bottom-right' hideProgressBar />
        <Container>
        <Route path='/' exact component={Login}/>
        <PrivateRoute path='/' component={NavBar}/>
        <PrivateRoute path='/add' component={AddItem}/>
        <PrivateRoute path='/month' component={Month}/>
        <PrivateRoute path='/week' component={Week}/>
        <PrivateRoute exact path='/today/:date' component={Today}/>
        <PrivateRoute exact path='/today/' component={Today}/>
        </Container>
        </Router>
        </>
        )     
}
