import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'semantic-ui-react'
import { toggleAddItemModal } from '../../../actions/modal'
import history from '../../../history'
import AddItem from './AddItemForm'

export default function AddItemModal() {

    const dispatch = useDispatch()

    const {addItemModalOpen} = useSelector(state => state.modal)

    const toggleModalClose = () => {
        dispatch(toggleAddItemModal())
        history.goBack()
    }

    return (
        <Modal
            open={addItemModalOpen}
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