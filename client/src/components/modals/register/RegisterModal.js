import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'semantic-ui-react'
import { setItemToEdit } from '../../../actions/toDo'
import history from '../../../history'
import RegisterForm from './RegisterForm'

export default function RegisterModal() {

    const dispatch = useDispatch()

    const {registerModalOpen} = useSelector(state => state.modal)

    const toggleRegisterModal= () => {
        dispatch(toggleRegisterModal())
        history.goBack()
    }

    return (
        <Modal
            open={registerModalOpen}
            size="tiny"
            onClose={toggleRegisterModal}
        >
            <Modal.Header>Sign up</Modal.Header>
            <Modal.Content>
                <RegisterForm toggleModal={toggleRegisterModal}/>
            </Modal.Content>
        </Modal>
    )
}