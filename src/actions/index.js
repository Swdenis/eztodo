import items from "../api/items"
import { FETCH_ITEMS,ADD_ITEM, DELETE_ITEM, UPDATE_ITEM, FETCH_ITEM,SIGN_IN,SIGN_OUT } from "./types"
import history from "../history"

export const signIn = userId => {
    return {type:SIGN_IN, payload: userId}
}

export const signOut = () => {
    return {type:SIGN_OUT}
}

export const getItems = () => async dispatch => {
    const response = await items.get('/items')
    dispatch({type: FETCH_ITEMS, payload: response.data})
}

export const addItem = formValues => async dispatch => {
    const response = await items.post('/items',formValues)
    console.log(response)
    dispatch({type: ADD_ITEM, payload: response.data})
    history.push('/items')
} 

export const updateItem = id => async dispatch => {
    const response = await items.patch(`/items/${id}`)
    console.log(response)
    dispatch({type: UPDATE_ITEM, payload: response.data})
    history.push('/items')
}

export const deleteItem = id => async dispatch => {
    const response = await items.delete(`/items'/${id}`)
    console.log(response)
    dispatch({type: DELETE_ITEM, payload: id})
    history.push('/items')
} 

export const getItem = id => async dispatch => {
    const response = await items.get(`/items'/${id}`)
    console.log(response)
    dispatch({type: FETCH_ITEM, payload: response.data})
    history.push('/items')
} 
