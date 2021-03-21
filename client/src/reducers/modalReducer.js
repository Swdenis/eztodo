/* eslint-disable import/no-anonymous-default-export */
import { TOGGLE_ADD_ITEM_MODAL, TOGGLE_ADD_MEETING_MODAL } from "../actions/types"

const INITIAL_STATE = {
    addItemModalOpen: false
}


export default (state=INITIAL_STATE,action) => {
    switch(action.type) {
        case TOGGLE_ADD_ITEM_MODAL:
            return {...state, addItemModalOpen: !state.addItemModalOpen}
        case TOGGLE_ADD_MEETING_MODAL:
            return {...state, addMeetingModalOpen: !state.addMeetingModalOpen}
        default:
            return state
        }
}