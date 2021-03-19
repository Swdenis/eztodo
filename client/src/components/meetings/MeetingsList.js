import React from 'react'
import { Grid } from 'semantic-ui-react'
import MeetingItem from './MeetingsItem'

export default function MeetingsList({meetings}) {
    return(
        <Grid.Column>
            {meetings.map(meeting =>
                <MeetingItem key={meeting.id} meeting = {meeting}/>
            )}
        </Grid.Column>
    )
}