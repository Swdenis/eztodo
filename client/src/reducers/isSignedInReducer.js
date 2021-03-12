import { SIGN_OUT, SIGN_IN} from "../actions/types";

const INITIAL_STATE= {
    isSignedIn: false,
    userId: ''
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case SIGN_IN:
            return({...state,isSignedIn: true, userId: action.payload})
        case SIGN_OUT:
            return({...state, isSignedIn: false, userId: ''})
        default:
            return state
    }
}