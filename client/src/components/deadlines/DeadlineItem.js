import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Popup, Segment } from 'semantic-ui-react'
import DeadlineButtons from './DeadlineButtons'

export default function DeadlineItem({deadline}) {
    
    const handelShowEditItems = (e) => {
        setActiveItemId(e.target.id)
    }

    const {loginData} = useSelector(state => state.auth)

    const [activeItemId, setActiveItemId] = useState(null)

    const handleMouseLeave =() => {
        setActiveItemId(null)
    }
    
    return(
        <>
        <Popup
            style={{boxShadow:"none"}}
            basic
            offset={[700, -58]}
            hoverable
            trigger={
                        <Segment
                        key={deadline.id}
                        id={deadline.id} 
                        onMouseEnter={e => handelShowEditItems(e)}
                        onMouseLeave={handleMouseLeave}
                        className={deadline.isDone ? 'isDone': ''}
                        style={{fontSize:"115%"}}
                        >
                            <Segment.Inline style={{display:"flex", justifyContent:"space-between"}}>
                                <Segment.Inline style={{flexBasis:"70%"}}>
                                {deadline.body}
                                </Segment.Inline>
                                <Segment.Inline style={{flexBasis:"20%"}}>
                                📆 {deadline.date}
                                </Segment.Inline>
                                <Segment.Inline style={{flexBasis:"10%"}}
                                >
                                🕓 {deadline.time}
                                </Segment.Inline>
                            </Segment.Inline>
                        </Segment>
            }>
            <Popup.Content >
                 <DeadlineButtons loginData={loginData} activeItemId={activeItemId} item={deadline} />
            </Popup.Content>
        </Popup> 
        </>
    )
}
