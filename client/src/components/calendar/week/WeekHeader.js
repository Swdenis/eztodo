import React from 'react'
import * as dateFns from "date-fns";
import dateFormat from "dateformat";

export default function WeekHeader({currentWeek,setCurrentWeek}) {

    const setNextWeek = () => {
        setCurrentWeek(dateFns.addWeeks(currentWeek, 1))
    }

    const setPrevWeek = () => {
        setCurrentWeek(dateFns.subWeeks(currentWeek, 1))
    }

    const nextWeek = dateFns.addWeeks(currentWeek,1)

    const renderMonthName = () => {
        return(
            dateFns.isSameMonth(currentWeek,nextWeek) 
            ?
            <>
            <span>
            {dateFormat(currentWeek,  "dd")}
            </span>
            <span>
            {dateFormat(nextWeek, "-dd mmm")}
            </span>
            </>
            :
            <>
            <span>
            {dateFormat(currentWeek,  "dd mmm")}
            </span>
            <span>
            {dateFormat(nextWeek, "-dd mmm")}
            </span>
            </>
        )
    }

    return (
        <div className="header row flex-middle">
        <div className="col col-start">
            <div className="icon" onClick={setPrevWeek}>
            chevron_left
            </div>
        </div>
        <div className="col col-center">
            {renderMonthName()}
        </div>
        <div className="col col-end" onClick={setNextWeek}>
            <div className="icon">chevron_right</div>
        </div>
        </div>)
}