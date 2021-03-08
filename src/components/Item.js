import React from 'react'
import { List } from 'semantic-ui-react'

export default function Item(props) {
    return(
        <List.Item>
           {props.body} 
        </List.Item>
    )
}
