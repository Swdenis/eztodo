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
        <Menu.Item as={NavLink} to='/today' content="My to-do list"/>
        <Menu.Item>
            <Button positive disabled={location.pathname === "/add"} 
            as={NavLink} to='/add' content="Add item" onClick={()=>dispatch(toggleAddItemModel())}/>
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