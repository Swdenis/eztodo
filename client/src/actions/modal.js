import { TOGGLE_ADD_ITEM_MODAL, TOGGLE_ADD_MEETING_MODAL } from "./types"

export const toggleAddItemModel = () => {
    return {type: TOGGLE_ADD_ITEM_MODAL}
}

export const toggleAddMeetingModel = () => {
    return {type: TOGGLE_ADD_MEETING_MODAL}
}