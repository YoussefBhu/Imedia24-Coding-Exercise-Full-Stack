import {SET_SEARCH_KEY, SET_CURRENT_CATEGORY} from "../Actions/types"

const initialState = {searchKey : null , currentCat : null }

function paramReducer(parameters = initialState , action){
    const { type, payload } = action;

    switch(type) {
        case SET_SEARCH_KEY :
            return {currentCat : null , searchKey : payload}

        case SET_CURRENT_CATEGORY : 
            return {searchKey : null , currentCat : payload}

        default : 
            return parameters
            
    }
}

export default paramReducer;