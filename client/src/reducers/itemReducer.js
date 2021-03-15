import { GET_ITEMS,ADD_ITEM,UPDATE_ITEM,DELETE_ITEM,GET_ITEM, SIGN_OUT } from "../actions/types";
import _ from 'lodash';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state={},action) => {
    switch(action.type) {
        case GET_ITEMS:
            return {...state,..._.mapKeys(action.payload, 'id')}
        case ADD_ITEM:
            return {...state,[action.payload.id]:action.payload}
        case UPDATE_ITEM:
            return {...state,[action.payload.id]:action.payload}
        case DELETE_ITEM:
            return _.omit(state,[action.payload])
        case GET_ITEM:
            return {...state,[action.payload.id]:action.payload}
        case SIGN_OUT:
            return({})
        default:
            return state
    }
}