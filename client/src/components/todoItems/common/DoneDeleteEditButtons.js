import React from 'react'
import { useDispatch } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import { toggleAddItemModal } from '../../../actions/modal';
import { deleteItem, setItemDone, setItemToEdit } from '../../../actions/toDo';
import history from '../../../history';

export default function DoneDeleteEditButtons({item,loginData,activeItemId,size}) {

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

    const handleEdit = () => {
        dispatch(toggleAddItemModal())
        dispatch(setItemToEdit(item))
        history.push('/todo/today/add')
    }

        return(
        !item.isDone 
        ?
        <>
            <Icon style={{cursor: "pointer"}} size={size}
            color="green" name='check' onClick={handleDone} />
            <Icon style={{cursor: "pointer"}} size={size}
            color="grey" name='edit' onClick={handleEdit}/>
            <Icon style={{cursor: "pointer"}} size={size}
            color="red" onClick={handleDelete} name='delete'/>
        </>
            :
            <Icon style={{cursor: "pointer"}} color="blue" size={size}
            onClick={handleReset} name='repeat' className="reset"/>
        )
}