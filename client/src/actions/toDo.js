import items from "../api/items"
import history from "../history"
import { ADD_ITEM, DELETE_ITEM, GET_ITEM, GET_ITEMS, UPDATE_ITEM } from "./types"

export const setItemDone = (item, accessToken) => async (dispatch) => {
    const response = await items.patch(`/items/${item.id}`,item,{
        'headers': {
          'Authorization': `Bearer ${accessToken}`}
      })
    console.log(response.data)
    dispatch({type: UPDATE_ITEM, payload: response.data})
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
    history.goBack()
} 

export const updateItem = id => async dispatch => {
    const response = await items.patch(`/items/${id}`)
    console.log(response)
    dispatch({type: UPDATE_ITEM, payload: response.data})
    history.push('/todo/today')
}

export const deleteItem = (itemId, accessToken)=> async (dispatch,getState) => {
    await items.delete(`/items/${itemId}`,{
        'headers': {
          'Authorization': `Bearer ${accessToken}`}
    })
    dispatch({type: DELETE_ITEM, payload: itemId})

} 

export const getItem = id => async dispatch => {
    const response = await items.get(`/items'/${id}`)
    console.log(response)
    dispatch({type: GET_ITEM, payload: response.data})
    history.push('/todo/today')
} 
