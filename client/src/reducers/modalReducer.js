import { TOGGLE_ADD_ITEM_MODAL } from "../actions/types"

const INITIAL_STATE = {
    addItemModalOpen: false
}


export default (state=INITIAL_STATE,action) => {
    switch(action.type) {
        case TOGGLE_ADD_ITEM_MODAL:
            return {...state, addItemModalOpen: !state.addItemModalOpen}
        default:
            return state
        }
}