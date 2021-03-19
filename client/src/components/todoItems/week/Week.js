import * as dateFns from "date-fns";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "../../../actions/toDo";
import { setSelectedDate } from "../../../actions";
import ThingsToDo from "../common/ThingsToDo";
import RowOfDailyItems from "./RowOfDailyItems";
import WeekHeader from "./WeekHeader";

export default function Week() {
    const dispatch = useDispatch()

    const items = Object.values(useSelector(state => state.items))
    const {loginData} = useSelector(state => state.auth)
    
    useEffect(()=> {
        dispatch(setSelectedDate(new Date()))
        if(loginData) 
        {const {userId, access_token} = loginData
        dispatch(getItems(userId,access_token))}},[dispatch,loginData])


    const [currentWeek, setCurrentWeek] = useState(dateFns.startOfWeek(new Date()))
    const [selectedWeekday, setSelectedWeekday] = useState(new Date())
    const itemsToDo = []

    const onDateClick = day => {
        setSelectedWeekday(day)
        dispatch(setSelectedDate(day))
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
                    : dateFns.isSameDay(day, selectedWeekday) ? "selected" : ""
                }`}
                key={day}
                onClick={() => onDateClick(dateFns.toDate(cloneDay))}
            >
                 <ThingsToDo thingsToDo={thingsToDo} cloneDay={cloneDay} />
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

    return (
        <>
        <div className='calendar'>
            <WeekHeader setCurrentWeek={setCurrentWeek} currentWeek={currentWeek} />
            {renderDays()}
            {renderCells()}
        </div>
            <RowOfDailyItems items={itemsToDo}/>
        </>
    )
}


