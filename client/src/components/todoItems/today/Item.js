import React, { useState } from 'react'
import { Popup, Segment } from 'semantic-ui-react'
import DoneDeleteEditButtons from '../common/DoneDeleteEditButtons'

export default function Item({loginData,item}) {

    const handelShowEditItems = (e) => {
        setActiveItemId(e.target.id)
    }

    const [activeItemId, setActiveItemId] = useState(null)

    const handleMouseLeave =() => {
        setActiveItemId(null)
    }

    return(
        <Popup
        offset={[555, -58]}
        basic
        style={{boxShadow:"none"}}
        hoverable
        trigger={

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
            </Segment.Inline>
        </Segment>
        }>
            <Popup.Content>
                <DoneDeleteEditButtons size="large" loginData={loginData} 
                activeItemId={activeItemId} item={item} />
            </Popup.Content>

        </Popup>
     
)}

