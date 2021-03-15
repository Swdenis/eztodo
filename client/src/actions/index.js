import items from "../api/items"
import { GET_ITEMS,ADD_ITEM, DELETE_ITEM, UPDATE_ITEM, GET_ITEM,SIGN_IN,SIGN_OUT, LOGIN,SET_SELECTED_DATE} from "./types"
import history from "../history"
import login from "../api/login"
import { toast } from "react-toastify"

export const signIn = (userId) => {
    return {type:SIGN_IN, payload: userId}
}

export const signOut = () => {
    return {type:SIGN_OUT}
}

export const setSelectedDate = (date) => {
    return {type: SET_SELECTED_DATE, payload: new Date(date)}
}

export const tryLogIn = (values) => async dispatch => {
        const response = await login.post('/login', values).catch(error=> toast.error(error.message))
        dispatch({type: LOGIN, payload: response.data})  
}

export const getItems = (userId, accessToken) => async dispatch => {
    const response = await items.get('/items/userId',{
        'headers': {
          'Authorization': `Bearer ${accessToken}`,
          'userId': userId
        }
      })
    dispatch({type: GET_ITEMS, payload: response.data})
}

export const addItem = (formValues,accessToken) => async dispatch => {
    const response = await items.post('/items',formValues,{
        'headers': {
          'Authorization': `Bearer ${accessToken}`}
      })
    dispatch({type: ADD_ITEM, payload: response.data})
    history.push(`/today/:${formValues.date}`)
} 

export const updateItem = id => async dispatch => {
    const response = await items.patch(`/items/${id}`)
    console.log(response)
    dispatch({type: UPDATE_ITEM, payload: response.data})
    history.push('/today')
}

export const deleteItem = (itemId, accessToken)=> async (dispatch,getState) => {
    const response = await items.delete(`/items/${itemId}`,{
        'headers': {
          'Authorization': `Bearer ${accessToken}`}
    })
    dispatch({type: DELETE_ITEM, payload: itemId})

} 

export const getItem = id => async dispatch => {
    const response = await items.get(`/items'/${id}`)
    console.log(response)
    dispatch({type: GET_ITEM, payload: response.data})
    history.push('/today')
} 
