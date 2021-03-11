import React, { useEffect } from 'react'
import {getItems} from '../actions'
import { useDispatch, useSelector } from 'react-redux'
import Item from './Item'
import { List } from 'semantic-ui-react'
import Calendar from './Calendar'

export default function ItemsList() {

    const dispatch = useDispatch()

    const items = Object.values(useSelector(state => state.items))
    const {loginData} = useSelector(state => state.auth)
    
    useEffect(()=> {
        if(loginData) 
        {const {userId, access_token} = loginData
        dispatch(getItems(userId,access_token))}},[dispatch,loginData])

    return(
        <>
        <Calendar items={items}/>
        </>
        )
}


{/* <ul>
                    {items.map(item => dateFns.isSameDay(new Date(item.date),cloneDay) ?
                    <span>{item.body}</span> 
                    : null
                )}
                </ul> */}