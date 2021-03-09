import { combineReducers } from 'redux';
import authReducer from './authReducer';
import itemReducer from './itemReducer';

export default combineReducers(
    {
        items: itemReducer,
        auth: authReducer
    }
)