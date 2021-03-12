import items from "../api/items"
import { FETCH_ITEMS,ADD_ITEM, DELETE_ITEM, UPDATE_ITEM, FETCH_ITEM,SIGN_IN,SIGN_OUT, LOGIN} from "./types"
import history from "../history"
import login from "../api/login"

export const signIn = (userId) => {
    return {type:SIGN_IN, payload: userId}
}

export const signOut = () => {
    return {type:SIGN_OUT}
}

export const tryLogIn = (values) => async dispatch => {
    const response = await login.post('/login', values)
    dispatch({type: LOGIN, payload: response.data})
}

export const getItems = (userId, accessToken) => async dispatch => {
    const response = await items.get('/items/userId',{
        'headers': {
          'Authorization': `Bearer ${accessToken}`,
          'userId': userId
        }
      })
    dispatch({type: FETCH_ITEMS, payload: response.data})
}

export const addItem = (formValues,accessToken) => async dispatch => {
    const response = await items.post('/items',formValues,{
        'headers': {
          'Authorization': `Bearer ${accessToken}`}
      })
    console.log(response)
    dispatch({type: ADD_ITEM, payload: response.data})
    history.push('/today')
} 

export const updateItem = id => async dispatch => {
    const response = await items.patch(`/items/${id}`)
    console.log(response)
    dispatch({type: UPDATE_ITEM, payload: response.data})
    history.push('/today')
}

export const deleteItem = id => async dispatch => {
    const response = await items.delete(`/items'/${id}`)
    console.log(response)
    dispatch({type: DELETE_ITEM, payload: id})
    history.push('/today')
} 

export const getItem = id => async dispatch => {
    const response = await items.get(`/items'/${id}`)
    console.log(response)
    dispatch({type: FETCH_ITEM, payload: response.data})
    history.push('/today')
} 
