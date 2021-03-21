import React from 'react'
import { List } from 'semantic-ui-react'
import MeetingItem from './MeetingsItem'

export default function MeetingsList({meetings}) {
    return(
        <List bulleted verticalAlign='middle' style={{fontSize:"20px"}}>
                {meetings.map(meeting =>
                    <MeetingItem key={meeting.id} meeting = {meeting}/>
                )}
        </List>
    )
}