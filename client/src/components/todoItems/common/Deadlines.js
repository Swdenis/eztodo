import React from 'react'

import * as dateFns from "date-fns";

export default function Deadlines({deadlines,cloneDay}) {

    return(
    dateFns.isSameDay(new Date(deadlines[0]?.date), dateFns.toDate(cloneDay))
        ?
    <span className="countDeadlines">
    <span
    style={
        deadlines.length > 5 ?
        {'font-weight':'900'}
        : deadlines.length > 2 ? {'font-weight':'700'}
        : {'font-weight':'400'}
    }
    >{deadlines.length}</span>
    {deadlines.length > 1 ? " deadlines" : " deadline"}
    </span> 
        : ''
    )
}
