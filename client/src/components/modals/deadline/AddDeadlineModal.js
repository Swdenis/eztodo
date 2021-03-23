import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'semantic-ui-react'
import { toggleAddDeadlineModal } from '../../../actions/modal'
import { setItemToEdit } from '../../../actions/toDo'
import history from '../../../history'
import AddDeadlineForm from './AddDeadlineForm'

export default function AddDeadlineModal() {

    const dispatch = useDispatch()

    const {addDeadlineModalOpen} = useSelector(state => state.modal)

    const toggleModalClose = () => {
        dispatch(toggleAddDeadlineModal())
        dispatch(setItemToEdit(''))
        history.goBack()
    }

    return (
        <Modal
            open={addDeadlineModalOpen}
            size="tiny"
            onClose={toggleModalClose}
        >
            <Modal.Header>Add a new deadline</Modal.Header>
            <Modal.Content>
                <AddDeadlineForm toggleModal={toggleModalClose}/>
            </Modal.Content>
        </Modal>
    )
}