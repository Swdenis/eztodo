import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'
import { Button, Container, Menu } from 'semantic-ui-react'
import { signOut } from '../../actions'
import { toggleAddItemModel } from '../../actions/modal'
import history from '../../history'

export default function NavBar() {
    const dispatch = useDispatch()

    const location = useLocation()

    const handleSingOut = () => {
      dispatch(signOut())
      history.push('/')
    }

    return(
    <Container>
    <Menu secondary>
        <Menu.Item as={NavLink} to='/todo/today' content="My to-do list"/>
        <Menu.Item as={NavLink} to='/meetings' content="My meetings"/>
        <Menu.Item as={NavLink} to='/deadlines' content="My deadlines"/>
        <Menu.Item position="right">
            <Button onClick={handleSingOut} content="Log out" negative/>
        </Menu.Item>
    </Menu>
    </Container>
    )


}