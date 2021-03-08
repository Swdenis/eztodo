import { FETCH_ITEMS,ADD_ITEM } from "../actions/types";
import _ from 'lodash';

export default (state={},action) => {
    switch(action.type) {
        case FETCH_ITEMS:
            return {...state,..._.mapKeys(action.payload, 'id')}
        case ADD_ITEM:
            return {...state,[action.payload]:action.payload}
        default:
            return state
    }
}