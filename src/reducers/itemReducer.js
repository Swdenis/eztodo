import { FETCH_ITEMS,ADD_ITEM,UPDATE_ITEM,DELETE_ITEM,FETCH_ITEM } from "../actions/types";
import _ from 'lodash';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state={},action) => {
    switch(action.type) {
        case FETCH_ITEMS:
            return {...state,..._.mapKeys(action.payload, 'id')}
        case ADD_ITEM:
            return {...state,[action.payload]:action.payload}
        case UPDATE_ITEM:
            return {...state,[action.payload]:action.payload}
        case DELETE_ITEM:
            return _.omit(state,[action.payload])
        case FETCH_ITEM:
            return {...state,[action.payload]:action.payload}
        default:
            return state
    }
}