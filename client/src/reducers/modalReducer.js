/* eslint-disable import/no-anonymous-default-export */
import { TOGGLE_ADD_DEADLINE_MODAL, TOGGLE_ADD_ITEM_MODAL, TOGGLE_ADD_MEETING_MODAL, TOGGLE_REGISTER_MODAL } from "../actions/types"

const INITIAL_STATE = {
    addItemModalOpen: false,
    addMeetingModalOpen: false,
    addDeadlineModalOpen: false,
    registerModalOpen: false
}


export default (state=INITIAL_STATE,action) => {
    switch(action.type) {
        case TOGGLE_ADD_ITEM_MODAL:
            return {...state, addItemModalOpen: !state.addItemModalOpen}
        case TOGGLE_ADD_MEETING_MODAL:
            return {...state, addMeetingModalOpen: !state.addMeetingModalOpen}
        case TOGGLE_ADD_DEADLINE_MODAL:
            return {...state, addDeadlineModalOpen: !state.addDeadlineModalOpen}
        case TOGGLE_REGISTER_MODAL:
            return {...state, registerModalOpen: !state.registerModalOpen}
        default:
            return state
        }
}