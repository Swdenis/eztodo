/* eslint-disable import/no-anonymous-default-export */
import { TOGGLE_ADD_DEADLINE_MODAL, TOGGLE_ADD_ITEM_MODAL, TOGGLE_ADD_MEETING_MODAL } from "../actions/types"

const INITIAL_STATE = {
    addItemModalOpen: false,
    addMeetingModalOpen: false,
    addDeadlineModalOpen: false
}


export default (state=INITIAL_STATE,action) => {
    switch(action.type) {
        case TOGGLE_ADD_ITEM_MODAL:
            return {...state, addItemModalOpen: !state.addItemModalOpen}
        case TOGGLE_ADD_MEETING_MODAL:
            return {...state, addMeetingModalOpen: !state.addMeetingModalOpen}
        case TOGGLE_ADD_DEADLINE_MODAL:
            return {...state, addDeadlineModalOpen: !state.addDeadlineModalOpen}
        default:
            return state
        }
}