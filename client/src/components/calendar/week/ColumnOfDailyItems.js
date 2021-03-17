import React from 'react'
import { List } from 'semantic-ui-react';
import DailyItem from './DailyItem';

export default function ColumnOfDailyItems({itemArray,id}) {
    
    return(
        <div className='itemCol' key={id}>
            <List bulleted verticalAlign='middle'>
                {itemArray.map(item =>
                <DailyItem key={item.id} item={item} />)  
                }
            </List>
        </div>)
}
                    
                    
            