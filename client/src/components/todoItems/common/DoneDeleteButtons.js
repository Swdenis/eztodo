import React from 'react'
import { useDispatch } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import { deleteItem, setItemDone } from '../../../actions/toDo';

export default function DoneDeleteButtons({item, loginData,activeItemId}) {

    const dispatch = useDispatch()

    const handleDone = () => {
        dispatch(setItemDone({...item, isDone: true}, loginData.access_token))
    }

    const handleReset = () => {
        dispatch(setItemDone({...item, isDone: false}, loginData.access_token))
    }

    const handleDelete= () => {
        if(window.confirm("Delete this item?"))
        {
        dispatch(deleteItem(activeItemId, loginData.access_token))
        alert("You deleted the item")
        }
    }

        return(
        !item.isDone 
        ?
        <>
        <Icon style={{cursor: "pointer"}} 
        color="green" name='check' onClick={handleDone} />
        <Icon style={{cursor: "pointer"}} 
        color="red" onClick={handleDelete} name='delete'/>
        </>
        :
        <Icon style={{cursor: "pointer"}} color="blue" 
        onClick={handleReset} name='repeat' className="reset"/>
        )
}