import React from 'react'
import {Router, Route} from 'react-router'
import { Container } from 'semantic-ui-react'
import NavBar from './NavBar'
import About from './About'
import history from '../history'
import AddItem from '../modals/AddItem'
import PrivateRoute from './PrivateRoute'
import Login from './Login'
import { ToastContainer } from 'react-toastify'
import '../App.css' 
import Calendar from './Calendar'
import Week from './Week'
import Today from './Today'

export default function App() {
    return(
        <>
        <ToastContainer position='bottom-right' hideProgressBar />
        <Router history={history} >
        <Container>
        <Route path='/' exact component={Login}/>
        <PrivateRoute path='/' component={NavBar}/>
        <PrivateRoute path='/about' component={About}/>
        <PrivateRoute path='/add' component={AddItem}/>
        <PrivateRoute path='/month' component={Calendar}/>
        <PrivateRoute path='/week' component={Week}/>
        <PrivateRoute path='/today' component={Today}/>
        </Container>
        </Router>
        </>
        )     
}
