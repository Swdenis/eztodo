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
import CalendarCells from "./CalendarCells";

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

    return (
      <div className='calendar'>
        <MonthHeader setCurrentMonth={setCurrentMonth} currentMonth={currentMonth}/> 
        <WeekDayNames currentMonth={currentMonth}/>
        <CalendarCells onDateClick={onDateClick} currentMonth={currentMonth} selectedMonthDate={selectedMonthDate} items={items} />
      </div>
    )
}
