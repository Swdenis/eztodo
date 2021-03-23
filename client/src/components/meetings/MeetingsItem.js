import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Icon, Segment } from 'semantic-ui-react'
import MeetingButtons from './MeetingButtons'

export default function MeetingItem({meeting}) {
    
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
        <Segment
        key={meeting.id}
        id={meeting.id} 
        onMouseEnter={e => handelShowEditItems(e)}
        onMouseLeave={handleMouseLeave}
        className={meeting.isDone ? 'isDone': ''}
        style={{fontSize:"115%"}}
        >
            <Segment.Inline style={{display:"flex", justifyContent:"space-between"}}>
                <Segment.Inline style={{flexBasis:"70%"}}>
                    {meeting.body}
                </Segment.Inline>
                <Segment.Inline style={{justifyContent:"felx-end"}}>
                    {showEditItems && activeItemId === meeting.id ?
                            <MeetingButtons loginData={loginData} activeItemId={activeItemId} item={meeting} />
                    : null}
                    <a rel="noreferrer" href={meeting.link} target="_blank">
                        <Icon color='blue' name="linkify"  size="large"/>
                    </a>
                </Segment.Inline>
            </Segment.Inline>
        </Segment>
    )
}
