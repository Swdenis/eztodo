import React, { useEffect, useState } from "react";
import * as dateFns from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { getItems, setSelectedDate, deleteItem } from "../actions";
import { Container, Grid, Icon, List } from "semantic-ui-react";
import { useParams } from "react-router";

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

    const handelShowEditItems = (e) => {
        setActiveItemId(e.target.id)
        setShowEditItems(true)
    }

    const [showEditItems, setShowEditItems] = useState(false)

    const [activeItemId, setActiveItemId] = useState(null)

    const handleDelete= () => {
        dispatch(deleteItem(activeItemId,loginData.access_token))
        alert("You deleted the to-do item")
    }

    const handleMouseLeave =() => {
        setShowEditItems(false)
        setActiveItemId(null)
    }

    const renderListOfItems = (todayItems) => {
        return(
            <List bulleted verticalAlign='middle' style={{fontSize:"20px"}}>
                {
                todayItems.map(item => 
                    <List.Item 
                    key={item.id}
                    id={item.id} 
                    onMouseEnter={e => handelShowEditItems(e)}
                    onMouseLeave={handleMouseLeave}
                    >
                        <List.Content 
                        style={{display:"inline"}}>
                        {item.body}
                        </List.Content>
                        {showEditItems && activeItemId === item.id ?
                            <List.Content
                            style={{display:"inline",position: "absolute", left:"200px"}}>
                                    <Icon color="green" name='check' />
                                    <Icon color="red" onClick={handleDelete} name='delete'/>
                            </List.Content> 
                        : null}
                 
                    </List.Item>
                    )
                }
        </List>)}

    const renderDay = (items) => {
        const todayItems = items.filter(item => 
            dateFns.isSameDay(new Date(item.date),currentDay))
        if(todayItems.length > 0) return(renderListOfItems(todayItems))
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
