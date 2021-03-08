import React from 'react'
import {Button, Container, Menu} from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'

export default function NavBar() {
    return(
    <Menu secondary>
        <Container>
        <Menu.Item as={NavLink} to='/items' content="My to-do list"/>
        <Menu.Item as={NavLink} to='/about' content="About" />
        <Menu.Item as={NavLink} to='/add' content="Add item" position='right'/>
        </Container>
    </Menu>
    )
}