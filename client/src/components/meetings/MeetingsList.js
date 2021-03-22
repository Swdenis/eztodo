import React from 'react'
import { Segment } from 'semantic-ui-react'
import MeetingItem from './MeetingsItem'

export default function MeetingsList({meetings}) {
    return(
        <Segment.Group>
                {meetings.map(meeting =>
                    <MeetingItem key={meeting.id} meeting = {meeting}/>
                )}
        </Segment.Group>
    )
}