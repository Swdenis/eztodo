import { TOGGLE_ADD_ITEM_MODAL, TOGGLE_ADD_MEETING_MODAL } from "./types"

export const toggleAddItemModal = () => {
    return {type: TOGGLE_ADD_ITEM_MODAL}
}

export const toggleAddMeetingModal = () => {
    return {type: TOGGLE_ADD_MEETING_MODAL}
}