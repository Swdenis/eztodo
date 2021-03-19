import React from 'react'
import ColumnOfDailyItems from './ColumnOfDailyItems';

export default function RowOfDailyItems({items}) {

return(
    <div className="row" id="itemsRow">
        {items.map(itemArray => 
            <ColumnOfDailyItems key={items.indexOf(itemArray)} id={items.indexOf(itemArray)} itemArray={itemArray}/>
        )}
    </div>   
)}