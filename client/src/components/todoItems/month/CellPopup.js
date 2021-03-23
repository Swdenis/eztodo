import React from 'react'
import { Popup } from 'semantic-ui-react'
import * as dateFns from "date-fns";
import DayCard from './DayCard';
import ThingsToDo from '../common/ThingsToDo';

export default function CellPopup({cloneDay,day,monthStart,selectedMonthDate,thingsToDo,onDateClick,formattedDate}) {
    return(
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
    )
}