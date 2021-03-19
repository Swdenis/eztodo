import React from 'react'
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