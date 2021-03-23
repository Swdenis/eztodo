import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Header } from 'semantic-ui-react'
import { toggleAddMeetingModal } from '../../actions/modal'
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
            dispatch(toggleAddMeetingModal())
            history.push('/meetings/add')
        }


    return(
        <Grid columns={2}>
                    <Grid.Row style={{marginTop:'5%'}}>
                        <Header as="h1" content="My meetings" />
                    </Grid.Row>
                    <Grid.Column>
                    <MeetingsList 
                    meetings={meetings}/>
                    <i style={{cursor: "pointer"}} 
                    className="big green plus circle icon" onClick={handleAddItem}/>
                    </Grid.Column>
                    <Grid.Column/>
        </Grid>)
}