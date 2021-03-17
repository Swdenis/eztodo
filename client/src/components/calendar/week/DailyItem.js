import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { List } from 'semantic-ui-react';
import DoneDeleteButtons from '../today/DoneDeleteButtons';

export default function DailyItem({item}) {

    const {loginData} = useSelector(state => state.auth)

    function truncate(str) {
        if(str) {
            return str.length > 17 ? str.substring(0,17)+'...' : str
        }
    }

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
            style={{display:"inline"}}
            >
                {item.body}
            </List.Content>
            {showEditItems && activeItemId === item.id ?
            <List.Content
            style={{display:"inline",position: "flex", justifyContent:"flex-end", flexDirection:"row"}}>
                <DoneDeleteButtons loginData={loginData} activeItemId={activeItemId} item={item} />
            </List.Content> 
            : null}
        </List.Item>)
}