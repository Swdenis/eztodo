import React from 'react'
import ItemsList from './ItemsList'
import {Router, Route} from 'react-router'
import { Container } from 'semantic-ui-react'
import NavBar from './NavBar'
import About from './About'
import history from '../history'
import AddItem from '../modals/AddItem'
import PrivateRoute from './PrivateRoute'
import Login from './Login'
import { ToastContainer } from 'react-toastify'

export default function App() {
    return(
        <>
        <ToastContainer position='bottom-right' hideProgressBar />
        <Router history={history} >
        <Container>
        <Route path='/' exact component={Login}/>
        <PrivateRoute path='/items' component={ItemsList}/>
        <PrivateRoute path='/' component={NavBar}/>
        <PrivateRoute path='/about' component={About}/>
        <PrivateRoute path='/add' component={AddItem}/>
        </Container>
        </Router>
        </>
        )     
}
