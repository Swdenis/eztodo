import { combineReducers } from 'redux';
import isSignedInReducer from './isSignedInReducer';
import itemReducer from './itemReducer';
import loginReducer from './loginReducer';

export default combineReducers(
    {
        items: itemReducer,
        auth: loginReducer,
        isSignedIn: isSignedInReducer
    }
)