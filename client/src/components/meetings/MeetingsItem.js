import React from 'react'
import { Grid } from 'semantic-ui-react'

export default function MeetingItem({meeting}) {
    console.log(meeting)
    return(
        <Grid.Row>
            <Grid.Column>
                {meeting.body}
            </Grid.Column>
            <Grid.Column>
                {meeting.link}
            </Grid.Column>
        </Grid.Row>
    )
}