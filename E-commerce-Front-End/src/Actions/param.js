import {SET_SEARCH_KEY, SET_CURRENT_CATEGORY} from './types'

export const setSearchKey = (key) => async (dispatch) => {
    dispatch({
        type: SET_SEARCH_KEY, 
        payload: key,
      });
}

export const setCurrentCategory = (cat) => async (dispatch) => {
    dispatch({
        type: SET_CURRENT_CATEGORY, 
        payload: cat,
      });
}