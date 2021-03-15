import { combineReducers } from 'redux';
import isSignedInReducer from './isSignedInReducer';
import itemReducer from './itemReducer';
import authReducer from './authReducer';
import selectedDateReducer from './selectedDateReducer';

export default combineReducers(
    {
        items: itemReducer,
        auth: authReducer,
        isSignedIn: isSignedInReducer,
        selectedDate: selectedDateReducer,
    }
)