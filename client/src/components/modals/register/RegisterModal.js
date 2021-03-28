import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'semantic-ui-react'
import { toggleRegisterModal } from '../../../actions/modal'
import { setItemToEdit } from '../../../actions/toDo'
import history from '../../../history'
import RegisterForm from './RegisterForm'

export default function RegisterModal() {

    const dispatch = useDispatch()

    const {registerModalOpen} = useSelector(state => state.modal)

    const handleToogleRegisterModal = () => {
        history.push('/')
        dispatch(toggleRegisterModal())
    }

    return (
        <Modal
            open={registerModalOpen}
            size="tiny"
            onClose={handleToogleRegisterModal}
        >
            <Modal.Header>Sign up</Modal.Header>
            <Modal.Content>
                <RegisterForm toggleModal={handleToogleRegisterModal}/>
            </Modal.Content>
        </Modal>
    )
}