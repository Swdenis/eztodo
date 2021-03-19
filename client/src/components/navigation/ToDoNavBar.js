import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

export default function ToDoNavBar() {
    return(
        <Menu text>
            <Menu.Item as={NavLink} to='/todo/today' content="Today"/>
            <Menu.Item as={NavLink} to='/todo/week' content="This week"/>
            <Menu.Item as={NavLink} to='/todo/month' content="This month"/>
      </Menu>
    )
}