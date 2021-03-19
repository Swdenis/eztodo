import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal } from 'semantic-ui-react'
import { toggleAddItemModel } from '../../actions/modal'
import history from '../../history'
import AddItem from './AddItemForm'

export default function AddItemModal() {

    const dispatch = useDispatch()

    const {addItemModalOpen} = useSelector(state => state.modal)

    const toggleModalClose = () => {
        dispatch(toggleAddItemModel())
        history.goBack()
    }

    return (
        <Modal
            open={addItemModalOpen}
            trigger={<Button>Add item</Button>}
            size="tiny"
            onClose={toggleModalClose}
        >
            <Modal.Header>Add a new to-do item</Modal.Header>
            <Modal.Content>
                <AddItem toggleModal={toggleModalClose}/>
            </Modal.Content>
        </Modal>
    )
}


// const Modal = props => {
//     return ReactDOM.createPortal(
//         <div onClick={props.onDismiss} 
//         className="ui dimmer modals visible active"
//         >
//             <div onClick={(e) => e.stopPropagation()} 
//             className="ui standard modal visible active"
//             >
//                 <i onClick={props.onDismiss} className="close icon"></i>
//                 <div className="header">{props.title}</div>
//                 <div className="content">{props.content}</div>
//                 <div class="actions">
//                     {props.actions}
//                 </div>
//             </div>
//         </div>,
//         document.querySelector("#modal")
//     )
// }

// export default Modal;