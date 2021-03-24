import { TOGGLE_ADD_DEADLINE_MODAL, TOGGLE_ADD_ITEM_MODAL, TOGGLE_ADD_MEETING_MODAL, TOGGLE_REGISTER_MODAL } from "./types"

export const toggleAddItemModal = () => {
    return {type: TOGGLE_ADD_ITEM_MODAL}
}

export const toggleAddMeetingModal = () => {
    return {type: TOGGLE_ADD_MEETING_MODAL}
}

export const toggleAddDeadlineModal = () => {
    return {type: TOGGLE_ADD_DEADLINE_MODAL}
}

export const toggleRegisterModal = () => {
    return {type: TOGGLE_REGISTER_MODAL}
}