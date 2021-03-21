import { combineReducers } from 'redux';
import isSignedInReducer from './isSignedInReducer';
import itemReducer from './itemReducer';
import authReducer from './authReducer';
import selectedDateReducer from './selectedDateReducer';
import modalReducer from './modalReducer';
import itemToEditReducer from './itemToEditReducer';

export default combineReducers(
    {
        items: itemReducer,
        auth: authReducer,
        isSignedIn: isSignedInReducer,
        selectedDate: selectedDateReducer,
        modal: modalReducer,
        itemToEdit: itemToEditReducer
    }
)