import { LOGIN, SIGN_OUT} from "../actions/types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state={}, action) => {
    switch(action.type) {
        case LOGIN:
            console.log({loginData:action.payload})
            return({...state,loginData:action.payload})
        case SIGN_OUT:
            return({})
        default:
            return state
    }
}
