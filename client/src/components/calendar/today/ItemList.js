import React, { useState } from 'react'
import { List } from 'semantic-ui-react'
import DoneDeleteButtons from '../common/DoneDeleteButtons'

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
                    style={{display:"flex", justifyContent:"space-between"}}
                    >
                    <List.Content style={{flexBasis:"70%"}}>
                    {item.body}
                    </List.Content>
                    {showEditItems && activeItemId === item.id ?
                        <List.Content>
                            <DoneDeleteButtons loginData={loginData} activeItemId={activeItemId} item={item} />
                        </List.Content> 
                    : null}
                    </List.Content>
                
                </List.Item>
                )
            }
    </List>
)}


