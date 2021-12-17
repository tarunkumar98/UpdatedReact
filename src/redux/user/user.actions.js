import { userActionTypes } from "./user.types";

export const signInSuccess=(user)=>({
    type:userActionTypes.SIGN_IN_SUCCESS,
    payload:user
});
export const signInStart=(user)=>({
    type:userActionTypes.SIGN_IN_START,
    payload:user
});
export const signOutStart=()=>({
    type:userActionTypes.SIGN_OUT_START
});

export const signOutSuccess=()=>({
    type:userActionTypes.SIGN_OUT_SUCCESS
});

export const signOutFailure=error=>({
    type:userActionTypes.SIGN_OUT_FAILURE,
    payload:error
});
export const signInFailure=error=>({
    type:userActionTypes.SIGN_OUT_FAILURE,
    payload:error
});
export const signUpSuccess=({user,additionalData})=>({
    type:userActionTypes.SIGN_UP_SUCCESS,
    payload:{user,additionalData}
})
