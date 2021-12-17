import postcartActionTypes from "./postcart.types";

export const togglePostcartHidden=()=>({
    type:postcartActionTypes.TOGGLE_CART_HIDDEN
});
export const addPost=post=>({
    type:postcartActionTypes.ADD_POST,
    payload:post
});
export const removePost=post=>({
    type:postcartActionTypes.CLEAR_POST_FROM_POSTCART,
    payload:post
});
export const clearPostcart=()=>({
    type:postcartActionTypes.CLEAR_POSTCART
});
