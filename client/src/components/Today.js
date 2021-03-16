import React, { useEffect, useState } from "react";
import * as dateFns from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { getItems, setSelectedDate } from "../actions";
import { Container, Grid } from "semantic-ui-react";
import { useParams } from "react-router";
import ItemList from "./ItemList";

export default function Today() {

    const dispatch = useDispatch()
    const { date } = useParams()

    const items = Object.values(useSelector(state => state.items))

    const {loginData} = useSelector(state => state.auth)
    
    useEffect(()=> {
        if(date) setCurrentDay(new Date(date))
        dispatch(setSelectedDate(new Date()))
        if(loginData) 
        {const {userId, access_token} = loginData
        dispatch(getItems(userId, access_token)
        )}},[dispatch, loginData, date])


    const [currentDay, setCurrentDay] = useState(new Date())

    const setNextDay = () => {
        let date = dateFns.addDays(currentDay, 1)
        setCurrentDay(date)
        dispatch(setSelectedDate(date))
    }

    const setPrevDay = () => {
        let date = dateFns.subDays(currentDay, 1)
        setCurrentDay(date)
        dispatch(setSelectedDate(date))
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

    const renderDay = (items) => {
        const todayItems = items.filter(item => 
            dateFns.isSameDay(new Date(item.date),currentDay))
        if(todayItems.length > 0) return(<ItemList loginData={loginData} items={todayItems}/>)
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
                {renderDay(items)}
                </Grid.Column>
                <Grid.Column/>
                <Grid.Column/>
        </Grid.Row>
    </Grid>
    )
} 
