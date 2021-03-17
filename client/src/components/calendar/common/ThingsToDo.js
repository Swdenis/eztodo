import React from 'react'

import * as dateFns from "date-fns";

export default function ThingsToDo({thingsToDo,cloneDay}) {
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
        : ''
    )
}