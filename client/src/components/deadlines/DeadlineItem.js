import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Icon, Segment } from 'semantic-ui-react'
import DeadlineButtons from './DeadlineButtons'

export default function DeadlineItem({deadline}) {
    
    const handelShowEditItems = (e) => {
        setActiveItemId(e.target.id)
        setShowEditItems(true)
    }

    const {loginData} = useSelector(state => state.auth)

    const [showEditItems, setShowEditItems] = useState(false)

    const [activeItemId, setActiveItemId] = useState(null)

    const handleMouseLeave =() => {
        setShowEditItems(false)
        setActiveItemId(null)
    }
    
    return(
        <>
        <Segment
        key={deadline.id}
        id={deadline.id} 
        onMouseEnter={e => handelShowEditItems(e)}
        onMouseLeave={handleMouseLeave}
        className={deadline.isDone ? 'isDone': ''}
        style={{fontSize:"115%"}}
        >
            <Segment.Inline style={{display:"flex", justifyContent:"space-between"}}>
                <Segment.Inline style={{flexBasis:"50%"}}>
                {deadline.body}
                </Segment.Inline>
                <Segment.Inline style={{flexBasis:"20%"}}>
                📆 {deadline.date}
                </Segment.Inline>
                <Segment.Inline style={{flexBasis:"20%"}}
                >
                🕓 {deadline.time}
                </Segment.Inline>
            </Segment.Inline>
        </Segment>
        {showEditItems && activeItemId === deadline.id ?
            <DeadlineButtons loginData={loginData} activeItemId={activeItemId} item={deadline} />
        : null}
        </>
    )
}
