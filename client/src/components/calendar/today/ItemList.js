import React, { useState } from 'react'
import { List } from 'semantic-ui-react'
import DoneDeleteButtons from './DoneDeleteButtons'

export default function ItemList({loginData,items}) {

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
        <List bulleted verticalAlign='middle' style={{fontSize:"20px"}}>
            {
            items.map(item => 
                <List.Item 
                key={item.id}
                id={item.id} 
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
                        style={{display:"inline",position: "absolute", left:"200px"}}>
                            <DoneDeleteButtons loginData={loginData} activeItemId={activeItemId} item={item} />
                        </List.Content> 
                    : null}
                
                </List.Item>
                )
            }
    </List>
)}


