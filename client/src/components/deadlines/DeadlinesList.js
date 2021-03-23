import React from 'react'
import { Segment } from 'semantic-ui-react'
import DeadlineItem from './DeadlineItem'

export default function DeadlinesList({deadlines}) {
    return(
        <Segment.Group>
                {deadlines.map(deadline =>
                    <DeadlineItem key={deadline.id} deadline = {deadline}/>
                )}
        </Segment.Group>
    )
}