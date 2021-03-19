import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import { getItems } from '../../actions/toDo'
import MeetingsList from './MeetingsList'

export default function Meetings() {
    const dispatch = useDispatch()

    const items = Object.values(useSelector(state => state.items))

    const meetings = items.filter(x => x.link)

    const {loginData} = useSelector(state => state.auth)
    
    useEffect(()=> {
        if(loginData) 
        {const {userId, access_token} = loginData
            dispatch(getItems(userId, access_token)
        )}},[dispatch, loginData])
    
    console.log(meetings)

    return(
    <Grid>
        <Grid.Column/>
        <MeetingsList meetings={meetings} />
        <Grid.Column/>
    </Grid>)
}