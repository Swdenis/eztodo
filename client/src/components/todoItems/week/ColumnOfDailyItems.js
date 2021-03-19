import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { List } from 'semantic-ui-react';
import { toggleAddItemModel } from '../../../actions/modal';
import history from '../../../history';
import DailyItem from './DailyItem';

export default function ColumnOfDailyItems({itemArray,id}) {

    const dispatch = useDispatch()

    const handleAddItem = () => {
        dispatch(toggleAddItemModel())
        history.push('/todo/week/add')
    }

    const [showAddItem, setShowAddItem] = useState(false)
    
    return(
        <div className='itemCol' key={id}
        onMouseEnter={() => setShowAddItem(true)}
        onMouseLeave={() => setShowAddItem(false)}>
            <List bulleted verticalAlign='middle' style={{color:'#1a8fff'}}>
                {itemArray.map(item =>
                <DailyItem key={item.id} item={item} />)  
                }
            </List>
            {showAddItem ?
            <i style={{cursor: "pointer"}} onClick={handleAddItem} 
            className="large green plus circle icon" />
            : ''}
            
        </div>)
}
