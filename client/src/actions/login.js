import { toast } from "react-toastify"
import login from "../api/login"
import { LOGIN, SIGN_IN, SIGN_OUT } from "./types"

export const signIn = (userId) => {
    return {type:SIGN_IN, payload: userId}
}

export const signOut = () => {
    return {type:SIGN_OUT}
}

export const tryLogIn = (values) => async dispatch => {
    const response = await login.post('/login', values).catch(error=> toast.error(error.message))
    dispatch({type: LOGIN, payload: response.data})  
}
