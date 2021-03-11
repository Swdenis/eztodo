import React, { useEffect, useState } from "react";
import * as dateFns from "date-fns";

export default function Calendar({items}) {

    const [currentMonth, setCurrentMonth] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState(new Date())

    console.log(items)

    const onDateClick = day => {
        setSelectedDate(day)
    }

    const nextMonth = () => {
        setCurrentMonth(dateFns.addMonths(currentMonth, 1))
    }

    const prevMonth = () => {
        setCurrentMonth(dateFns.subMonths(currentMonth, 1))
    }

    const renderHeader = () => {
        const dateFormat = "MMMM yyyy";
        return (
            <div className="header row flex-middle">
            <div className="col col-start">
                <div className="icon" onClick={prevMonth}>
                chevron_left
                </div>
            </div>
            <div className="col col-center">
                <span>
                {dateFns.format(currentMonth, dateFormat)}
                </span>
            </div>
            <div className="col col-end" onClick={nextMonth}>
                <div className="icon">chevron_right</div>
            </div>
            </div>)
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
            <div
                className={`col cell ${
                !dateFns.isSameMonth(day, monthStart)
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
            : null
        )
    }
    return (
      <div className='calendar'>
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>
    )
}
