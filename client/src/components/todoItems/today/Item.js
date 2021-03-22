import React, { useState } from 'react'
import { Segment } from 'semantic-ui-react'
import DoneDeleteEditButtons from '../common/DoneDeleteEditButtons'

export default function Item({loginData,item}) {

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
        <Segment
        key={item.id}
        id={item.id} 
        onMouseEnter={e => handelShowEditItems(e)}
        onMouseLeave={handleMouseLeave}
        className={item.isDone ? 'isDone': ''}
        style={{fontSize:"115%"}}
        >
            <Segment.Inline 
            style={{display:"flex", justifyContent:"space-between"}}
            >
                <Segment.Inline style={{flexBasis:"70%"}}>
                {item.body}
                </Segment.Inline>
                {showEditItems && activeItemId === item.id ?
                    <Segment.Inline>
                        <DoneDeleteEditButtons loginData={loginData} activeItemId={activeItemId} item={item} />
                    </Segment.Inline> 
                : null}
            </Segment.Inline>
        </Segment>
        
)}
