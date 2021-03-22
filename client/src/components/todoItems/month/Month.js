import React, { useEffect, useState } from "react";
import * as dateFns from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "../../../actions/toDo";
import { setSelectedDate } from "../../../actions";
import DayCard from "./DayCard";
import { Popup } from "semantic-ui-react";
import ThingsToDo from "../common/ThingsToDo";
import MonthHeader from "./MonthHeader";
import WeekDayNames from "./WeekDayNames";

export default function Month() {
    const dispatch = useDispatch()

    const items = Object.values(useSelector(state => state.items))
    const {loginData} = useSelector(state => state.auth)
    
    useEffect(()=> {
        dispatch(setSelectedDate(new Date()))
        if(loginData) 
        {const {userId, access_token} = loginData
        dispatch(getItems(userId,access_token))}},[dispatch,loginData])


    const [currentMonth, setCurrentMonth] = useState(new Date())
    const [selectedMonthDate, setSelectedMonthDate] = useState(new Date())

    const onDateClick = day => {
        setSelectedMonthDate(day)
        dispatch(setSelectedDate(day))
    }


    const renderDays = () => {
        const dateFormat = "iiii";
        const days = [];
        let startDate = dateFns.startOfWeek(currentMonth);
        for (let i = 0; i < 7; i++) {
        days.push(
        <div className="col col-center" key={i}>
            {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
        )}
        return <div className="days row">{days}</div>}

        const renderCells = () => {
        const monthStart = dateFns.startOfMonth(currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart);
        const endDate = dateFns.endOfWeek(monthEnd);

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
            days.push(
            <Popup
            hoverable
            trigger={
                <div
                className={`col cell ${
                !dateFns.isSameMonth(day, monthStart)
                    ? "disabled"
                    : dateFns.isSameDay(day, selectedMonthDate) ? "selected" : ""
                }`}
                key={day}
                onClick={() => onDateClick(dateFns.toDate(cloneDay))}
            >
                <ThingsToDo thingsToDo={thingsToDo} cloneDay={cloneDay} />
                <span className="number">{formattedDate}</span>
                <span className="bg">{formattedDate}</span>
            </div>
            }>
            <Popup.Content>
                    <DayCard day={cloneDay} items = {thingsToDo} />
                    </Popup.Content>
            </Popup>  
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

    return (
      <div className='calendar'>
        <MonthHeader setCurrentMonth={setCurrentMonth} currentMonth={currentMonth}/> 
        <WeekDayNames currentMonth={currentMonth}/>
        {renderCells()}
      </div>
    )
}
