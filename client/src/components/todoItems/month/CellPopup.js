import React from 'react'
import { Popup } from 'semantic-ui-react'
import * as dateFns from "date-fns";
import DayCard from './DayCard';
import ThingsToDo from '../common/ThingsToDo';
import Deadlines from '../common/Deadlines';

export default function CellPopup({cloneDay,day,monthStart,selectedMonthDate,
    thingsToDo,onDateClick,formattedDate}) {
    
    const deadlines = thingsToDo.filter(item => item.isDeadline === true)

    const disabledOrSelectedClassName = () => {
        return !dateFns.isSameMonth(day, monthStart)
        ? "disabled"
        : dateFns.isSameDay(day, selectedMonthDate) ? "selected" : ""
    }

    const deadlineClassName = () => {
        return deadlines.length > 0
        ? " deadline"
        : ""
    }
    
    const setClassName = () => {
        const selected = disabledOrSelectedClassName()
        const deadline = deadlineClassName()
        return(selected+deadline)
    }

    return(
        <Popup
            hoverable
            trigger={
                <div
                className={`col cell ${
                    setClassName()
                }`}
                key={day}
                onClick={() => onDateClick(dateFns.toDate(cloneDay))}
                >
                    <ThingsToDo thingsToDo={thingsToDo} cloneDay={cloneDay} />
                    <Deadlines deadlines={deadlines} cloneDay={cloneDay} />
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