import React from 'react'
import {Button, Container, Menu} from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'

export default function NavBar() {
    return(
    <Container>
    <Menu secondary>
        <Menu.Item as={NavLink} to='/items' content="My to-do list"/>
        <Menu.Item as={NavLink} to='/about' content="About" />
        <Menu.Item as={NavLink} to='/add' content="Add item" position='right'/>
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