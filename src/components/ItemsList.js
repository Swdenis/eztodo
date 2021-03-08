import React, { useEffect } from 'react'
import {getItems} from '../actions'
import { useDispatch, useSelector } from 'react-redux'
import Item from './Item'
import { List } from 'semantic-ui-react'

export default function ItemsList() {

    const dispatch = useDispatch()

    const items = Object.values(useSelector(state => state.items))

    useEffect(()=>dispatch(getItems()),[dispatch])

    console.log(items.map(item=> item.body))

    return(
        <List>
        {items.map(item=>{
            return <Item key={item.id} body={item.body} />
        })}
        </List>
        )
}

