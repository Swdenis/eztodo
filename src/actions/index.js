import items from "../api/items"
import { FETCH_ITEMS,ADD_ITEM } from "./types"
import history from "../history" 

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