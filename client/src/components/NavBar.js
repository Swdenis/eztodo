import React from 'react'
import {Button, Container, Menu} from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'
import { signOut } from '../actions'
import history from '../history'
import { useDispatch } from 'react-redux'

export default function NavBar() {
    const dispatch = useDispatch()

    const handleSingOut = () => {
      dispatch(signOut())
      history.push('/')
    }

    return(
    <Container>
    <Menu secondary>
        <Menu.Item as={NavLink} to='/items' content="My to-do list"/>
        <Menu.Item as={NavLink} to='/about' content="About" />
        <Menu.Item as={NavLink} to='/add' content="Add item"/>
        <Menu.Item position="right">
            <Button onClick={handleSingOut} content="Log out" negative/>
        </Menu.Item>
    </Menu>
    <Menu text>
        <Menu.Item
          name='Show today'
        />
        <Menu.Item
          name='week'
        />
        <Menu.Item
          name='month'
        /> 
      </Menu>
    </Container>
    )
}