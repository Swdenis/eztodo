import { FETCH_ITEMS,ADD_ITEM,UPDATE_ITEM,DELETE_ITEM,FETCH_ITEM, SIGN_OUT } from "../actions/types";
import _ from 'lodash';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state={},action) => {
    switch(action.type) {
        case FETCH_ITEMS:
            return {...state,...action.payload}
        case ADD_ITEM:
            return {...state,[action.payload.userId]:action.payload}
        case UPDATE_ITEM:
            return {...state,[action.payload.userId]:action.payload}
        case DELETE_ITEM:
            return _.omit(state,[action.payload])
        case FETCH_ITEM:
            return {...state,[action.payload.userId]:action.payload}
        case SIGN_OUT:
            return({})
        default:
            return state
    }
}