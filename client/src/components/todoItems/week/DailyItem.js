import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { List } from 'semantic-ui-react';
import DoneDeleteEditButtons from '../common/DoneDeleteEditButtons';

export default function DailyItem({item}) {

    const {loginData} = useSelector(state => state.auth)

    const handelShowEditItems = (e) => {
        setActiveItemId(e.target.id)
        setShowEditItems(true)
    }

    const [showEditItems, setShowEditItems] = useState(false)

    const [activeItemId, setActiveItemId] = useState(null)

    const handleMouseLeave =() => {
        setShowEditItems(false)
        setActiveItemId(null)
    }

    return(
        <List.Item 
        key={item.id} 
        id={item.id} 
        style={{"paddingTop":"10px"}}
        onMouseEnter={e => handelShowEditItems(e)}
        onMouseLeave={handleMouseLeave}
        className={item.isDone ? 'isDone': ''}
        >
            <List.Content
            style={{display:"flex", justifyContent:"space-between",color:'black'}}>
                <List.Content style={{flexBasis:"70%",overflow:"hidden",overflowWrap: "break-word"}}>
                {item.body}
                </List.Content>
                <List.Content>
                {showEditItems && activeItemId === item.id ?
                    <DoneDeleteEditButtons loginData={loginData} activeItemId={activeItemId} item={item} />
                : null}
                </List.Content>
            </List.Content>
        </List.Item>)
}