import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Icon, List } from 'semantic-ui-react'
import DoneDeleteButtons from '../todoItems/common/DoneDeleteButtons'

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
        <List.Item
        key={meeting.id}
        id={meeting.id} 
        onMouseEnter={e => handelShowEditItems(e)}
        onMouseLeave={handleMouseLeave}
        className={meeting.isDone ? 'isDone': ''}
        >
            <List.Content style={{display:"flex", justifyContent:"space-between"}}>
                <List.Content style={{flexBasis:"70%"}}>
                    {meeting.body}
                </List.Content>
                <List.Content style={{justifyContent:"felx-end"}}>
                    {showEditItems && activeItemId === meeting.id ?
                            <DoneDeleteButtons loginData={loginData} activeItemId={activeItemId} item={meeting} />
                    : null}
                    <a rel="noreferrer" href={meeting.link} target="_blank"><Icon color='blue' name="linkify"/></a>
                </List.Content>
            </List.Content>
        </List.Item>
    )
}
