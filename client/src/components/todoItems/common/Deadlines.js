import React from 'react'

import * as dateFns from "date-fns";

export default function Deadlines({deadlines,cloneDay}) {

    return(
    dateFns.isSameDay(new Date(deadlines[0]?.date), dateFns.toDate(cloneDay))
        ?
    <span className="countDeadlines"
    >
    <span>{deadlines.length}</span>
    {deadlines.length > 1 ? " deadlines" : " deadline"}
    </span> 
        : ''
    )
}
