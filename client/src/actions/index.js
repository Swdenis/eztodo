import items from "../api/items"
import { GET_ITEMS,ADD_ITEM, DELETE_ITEM, UPDATE_ITEM, GET_ITEM,SIGN_IN,SIGN_OUT, LOGIN,SET_SELECTED_DATE} from "./types"
import history from "../history"
import login from "../api/login"
import { toast } from "react-toastify"

export const setSelectedDate = (date) => {
    return {type: SET_SELECTED_DATE, payload: new Date(date)}
}