import { EDIT_ITEM } from "../actions/types"

export default (state={}, action) => {
    switch(action.type) {
        case EDIT_ITEM:
            return({...state, item: action.payload})
        default:
            return state
    }
}