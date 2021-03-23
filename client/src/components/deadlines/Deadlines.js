import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Header } from 'semantic-ui-react'
import { toggleAddDeadlineModal } from '../../actions/modal'
import { getItems } from '../../actions/toDo'
import history from '../../history'
import DeadlinesList from './DeadlinesList'

export default function Deadlines() {
    const dispatch = useDispatch()

    const items = Object.values(useSelector(state => state.items))

    const deadlines = items.filter(x => x.isDeadline === true)

    const {loginData} = useSelector(state => state.auth)
    
    useEffect(()=> {
        if(loginData) 
        {const {userId, access_token} = loginData
            dispatch(getItems(userId, access_token)
        )}},[dispatch, loginData])
    
        const handleAddItem = () => {
            dispatch(toggleAddDeadlineModal())
            history.push('/deadlines/add')
        }


    return(
        <Grid>
                    <Grid.Row style={{marginTop:'5%'}}>
                        <Header as="h1" content="My deadlines" />
                    </Grid.Row>
                    <Grid.Column width={10}>
                    <DeadlinesList 
                    deadlines={deadlines}/>
                    <i style={{cursor: "pointer"}} 
                    className="big green plus circle icon" onClick={handleAddItem}/>
                    </Grid.Column>
        </Grid>)
}