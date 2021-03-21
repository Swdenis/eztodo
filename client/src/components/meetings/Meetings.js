import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Grid } from 'semantic-ui-react'
import { toggleAddItemModel } from '../../actions/modal'
import { getItems } from '../../actions/toDo'
import history from '../../history'
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
    
        const handleAddItem = () => {
            dispatch(toggleAddItemModel())
            history.push('/todo/today/add')
        }


    return(
        <Grid columns={2}>
                    <Grid.Column style={{marginTop:'10%'}}>
                    <MeetingsList 
                    meetings={meetings}/>
                    <i style={{cursor: "pointer"}} 
                    className="big green plus circle icon" onClick={handleAddItem}/>
                    </Grid.Column>
                    <Grid.Column/>
        </Grid>)
}