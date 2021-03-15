import React from 'react'
import {Button, Container, Menu} from 'semantic-ui-react'
import {NavLink, useLocation} from 'react-router-dom'
import { signOut } from '../actions'
import history from '../history'
import { useDispatch } from 'react-redux'

export default function NavBar() {
    const dispatch = useDispatch()

    const location = useLocation()

    console.log(location.pathname)

    const handleSingOut = () => {
      dispatch(signOut())
      history.push('/')
    }

    return(
    <Container>
    <Menu secondary>
        <Menu.Item as={NavLink} to='/today' content="My to-do list"/>
        <Menu.Item>
            <Button positive disabled={location.pathname === "/add"} as={NavLink} to='/add' content="Add item"/>
        </Menu.Item>
        <Menu.Item position="right">
            <Button onClick={handleSingOut} content="Log out" negative/>
        </Menu.Item>
    </Menu>
    <Menu text>
        <Menu.Item as={NavLink} to='/today' content="Today"/>
        <Menu.Item as={NavLink} to='/week' content="This week"/>
        <Menu.Item as={NavLink} to='/month' content="This month"/>
      </Menu>
    </Container>
    )
}