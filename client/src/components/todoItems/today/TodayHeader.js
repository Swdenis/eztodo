import * as dateFns from "date-fns";
import React from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedDate } from "../../../actions";



export default function TodayHeader({currentDay,setCurrentDay}) {

    const dispatch = useDispatch()

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