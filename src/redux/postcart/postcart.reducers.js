import postcartActionTypes from "./postcart.types";
import { addPostToPostcart } from "./postcart.utils";

const INITINAL_STATE=({
    hidden:true,
    postcart:[]
});

const postcartReducer=(state=INITINAL_STATE,action)=>{
    switch(action.type){
        case postcartActionTypes.TOGGLE_CART_HIDDEN:
            return{
                ...state,
                hidden:!state.hidden
            }
        case postcartActionTypes.ADD_POST:
            return{
                ...state,
                postcart:addPostToPostcart(state.postcart,action.payload)
            }
        case postcartActionTypes.CLEAR_POSTCART:
            return {
                ...state,
                postcart:[]
            }
        default:
            return state
    }
}

export default postcartReducer;