import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'semantic-ui-react'
import { toggleAddMeetingModal } from '../../../actions/modal'
import { setItemToEdit } from '../../../actions/toDo'
import history from '../../../history'
import AddMeetingForm from './AddMeetingForm'

export default function AddMeetingModal({modalTitle}) {

    const dispatch = useDispatch()

    const {addMeetingModalOpen} = useSelector(state => state.modal)

    const toggleModalClose = () => {
        dispatch(toggleAddMeetingModal())
        dispatch(setItemToEdit(''))
        history.goBack()
    }

    return (
        <Modal
            open={addMeetingModalOpen}
            size="tiny"
            onClose={toggleModalClose}
        >
            <Modal.Header>{modalTitle}</Modal.Header>
            <Modal.Content>
                <AddMeetingForm toggleModal={toggleModalClose}/>
            </Modal.Content>
        </Modal>
    )
}