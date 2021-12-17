import jwtDecode from "jwt-decode";
import { userActionTypes } from "./user.types";

const INITINAL_STATE = {
    currentUser: null,
};

if (localStorage.getItem("jwtToken")) {
    const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));
    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("jwtToken");
    } else {
        INITINAL_STATE.currentUser = decodedToken;
    }
}

const userReducer=(state=INITINAL_STATE,action)=>{
    switch(action.type){
        case userActionTypes.SIGN_IN_SUCCESS:
            return{
                ...state,
                currentUser:action.payload,
            }
        case userActionTypes.SIGN_OUT_SUCCESS:
            return{
                ...state,
                currentUser:null
            }
        default:
            return state
    }
}

export default userReducer;