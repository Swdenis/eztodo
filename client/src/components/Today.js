import React, { useEffect, useState } from "react";
import * as dateFns from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "../actions";
import { Container, Grid, GridColumn, List } from "semantic-ui-react";

export default function Today() {
    const dispatch = useDispatch()

    const items = Object.values(useSelector(state => state.items))
    const {loginData} = useSelector(state => state.auth)
    
    useEffect(()=> {
        if(loginData) 
        {const {userId, access_token} = loginData
        dispatch(getItems(userId,access_token))}},[dispatch,loginData])


    const [currentDay, setCurrentDay] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState(new Date())

    const onDateClick = day => {
        setSelectedDate(day)
    }

    const setNextDay = () => {
        setCurrentDay(dateFns.addDays(currentDay, 1))
    }

    const setPrevDay = () => {
        setCurrentDay(dateFns.subDays(currentDay, 1))
    }

    const renderHeader = () => {
        const dateFormat = "iii, d MMMM yyyy";
        return (
            <div className="header row flex-middle">
            <div className="col col-start">
                <div className="icon" onClick={setPrevDay}>
                chevron_left
                </div>
            </div>
            <div className="col col-center">
                <span>
                {dateFns.format(currentDay, dateFormat)}
                </span>
            </div>
            <div className="col col-end" onClick={setNextDay}>
                <div className="icon">chevron_right</div>
            </div>
            </div>)
    }

    const renderItems = (items) => {
        const todayItems = items.filter(item => 
            dateFns.isSameDay(new Date(item.date),currentDay))
        if(todayItems.length > 0)
        {
        return(
        <List verticalAlign='middle' style={{fontSize:"20px"}}>
        {
        todayItems.map(item => 
            <List.Item key={item.id}>
                <List.Icon name='check' />
                {item.body}
            </List.Item>)
        }
        </List>)}
        return(
        <Container
        position="center"
        text
        style={{"fontSize": "140%"}}
        content="You don't have any tasks for today!"/>)
    }

    return (

    <Grid columns={3}>
        <Grid.Row>
        <Grid.Column width={16}>
        <div className='calendar'>
            {renderHeader()}
        </div>
        </Grid.Column>
        </Grid.Row>
        <Grid.Row>
                <Grid.Column>
                {renderItems(items)}
                </Grid.Column>
                <Grid.Column/>
                <Grid.Column/>
        </Grid.Row>
    </Grid>
    )
}   
