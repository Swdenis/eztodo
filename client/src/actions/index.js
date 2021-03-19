import { SET_SELECTED_DATE} from "./types"

export const setSelectedDate = (date) => {
    return {type: SET_SELECTED_DATE, payload: new Date(date)}
}