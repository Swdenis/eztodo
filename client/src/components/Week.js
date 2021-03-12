import React, { useEffect, useState } from "react";
import * as dateFns from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "../actions";
import dateFormat from "dateformat"
import { Grid, List } from "semantic-ui-react";

export default function Week() {
    const dispatch = useDispatch()

    const items = Object.values(useSelector(state => state.items))
    const {loginData} = useSelector(state => state.auth)
    
    useEffect(()=> {
        if(loginData) 
        {const {userId, access_token} = loginData
        dispatch(getItems(userId,access_token))}},[dispatch,loginData])


    const [currentWeek, setCurrentWeek] = useState(dateFns.startOfWeek(new Date()))
    const [selectedDate, setSelectedDate] = useState(new Date())
    const itemsToDo = []

    const onDateClick = day => {
        setSelectedDate(day)
    }

    const setNextWeek = () => {
        setCurrentWeek(dateFns.addWeeks(currentWeek, 1))
    }

    const setPrevWeek = () => {
        setCurrentWeek(dateFns.subWeeks(currentWeek, 1))
    }

    const renderHeader = () => {
        const nextWeek = dateFns.addWeeks(currentWeek,1)
        return (
            <div className="header row flex-middle">
            <div className="col col-start">
                <div className="icon" onClick={setPrevWeek}>
                chevron_left
                </div>
            </div>
            <div className="col col-center">
                {
                !dateFns.isSameMonth(currentWeek,nextWeek) 
                ?
                <>
                <span>
                {dateFormat(currentWeek,  "dd mmm")}
                </span>
                <span>
                {dateFormat(nextWeek, "-dd mmm")}
                </span>
                </>
                :
                <>
                <span>
                {dateFormat(currentWeek,  "dd")}
                </span>
                <span>
                {dateFormat(nextWeek, "-dd mmm")}
                </span>
                </>
                }
            </div>
            <div className="col col-end" onClick={setNextWeek}>
                <div className="icon">chevron_right</div>
            </div>
            </div>)
    }

    const renderDays = () => {
        const dateFormat = "iiii";
        const days = [];
        let startDate = dateFns.startOfWeek(currentWeek);
        for (let i = 0; i < 7; i++) {
        days.push(
        <div className="col col-center" key={i}>
            {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
        )}
        return <div className="days row">{days}</div>}

    const renderCells = () => {
        const startDate = dateFns.startOfWeek(currentWeek);
        const endDate = dateFns.endOfWeek(currentWeek);

        const dateFormat = "d";
        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = "";
        while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = dateFns.format(day, dateFormat);
            const cloneDay = day;
            let thingsToDo = items.filter(item => 
                dateFns.isSameDay(new Date(item.date), cloneDay))
            itemsToDo.push(thingsToDo)
            days.push(
            <div
                className={`col cell ${
                !dateFns.isSameWeek(day, startDate)
                    ? "disabled"
                    : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
                }`}
                key={day}
                onClick={() => onDateClick(dateFns.toDate(cloneDay))}
            >
                {renderCountThingsToDo(thingsToDo,cloneDay)}
                <span className="number">{formattedDate}</span>
                <span className="bg">{formattedDate}</span>
            </div>
            );
            day = dateFns.addDays(day, 1)
        }
        rows.push(
            <div className="row" key={day}>
            {days}
            </div>
        );
        days = [];
        }
        return <div className="body">{rows}</div>
    }

    const renderCountThingsToDo = (thingsToDo,cloneDay) => {
        return(
        dateFns.isSameDay(new Date(thingsToDo[0]?.date), dateFns.toDate(cloneDay))
            ?
        <span className="countThingsToDo">
        <span
        style={
            thingsToDo.length > 5 ?
            {'color':'red'}
            : thingsToDo.length > 2 ? {'color':'orange'}
            : {'color':'green'}
        }
        >{thingsToDo.length}</span>
        {thingsToDo.length > 1 ? " things to do" : " thing to do"}
        </span> 
            : ''
        )
    }
    const renderItemsToDo = () => {
        return(
            <div className="row" id="itemsRow">
            {itemsToDo.map(itemArray => 
                <div className='col' key={itemsToDo.indexOf(itemArray)}>
                        <List verticalAlign='middle'>
                            {itemArray.map(item =>
                                        <List.Item key={item.id} style={{"padding-top":"10px"}}>
                                            <List.Icon centered size='small' name='check' style={{
                                                "color": "#1a8fff","padding-top":"3px","margin-right":"3px"}}/>
                                            {item.body}
                                        </List.Item>)
                            }
                        </List>
                </div>
            )}
            </div>   
    )}

    console.log(itemsToDo)
    return (
        <>
        <div className='calendar'>
            {renderHeader()}
            {renderDays()}
            {renderCells()}
            
        </div>
            {renderItemsToDo()}
        </>
    )
}
