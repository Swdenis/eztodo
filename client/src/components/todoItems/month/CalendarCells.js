import React from 'react'
import * as dateFns from "date-fns";
import CellPopup from './CellPopup';

export default function CalendarCells({currentMonth,selectedMonthDate,items,onDateClick}) {
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
            <CellPopup 
            cloneDay={cloneDay} day={cloneDay} thingsToDo={thingsToDo} formattedDate={formattedDate}
            monthStart={monthStart} onDateClick={onDateClick} selectedMonthDate={selectedMonthDate}
            />
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