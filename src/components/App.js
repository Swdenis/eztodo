import React from 'react'
import ItemsList from './ItemsList'
import {Router, Route} from 'react-router'
import { Container } from 'semantic-ui-react'
import NavBar from './NavBar'
import About from './About'
import history from '../history'
import AddItem from '../modals/AddItem'

export default function App() {
    return(
        <Router history={history} >
        <NavBar/>
        <Container>
        <Route path='/items' component={ItemsList}/>
        <Route path='/about' component={About}/>
        <Route path='/add' component={AddItem}/>
        </Container>
        </Router>
        )     
}
