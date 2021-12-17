import { takeLatest,put, all, call } from "@redux-saga/core/effects"
import { userActionTypes } from "./user.types";

import { signOutSuccess,signInSuccess,signOutFailure,signInStart,signOutStart,signInFailure} from "./user.actions";

export function* signOut(){
    try{
        yield localStorage.removeItem("jwtToken");
        yield put(signOutSuccess());
    }catch(error){
        yield put(signOutFailure(error.message));
    }
}

export function* onSignOutStart(){
    yield takeLatest(userActionTypes.SIGN_OUT_START,signOut)
}

export function* signIn({payload}){
    try{
        yield localStorage.setItem("jwtToken", payload.token);
        yield put(signInSuccess(payload))
    }catch(error){
        yield put(signInFailure(error))
    }
}

export function* onSignInStart(){
    yield takeLatest(userActionTypes.SIGN_IN_START,signIn)
}

export function* userSagas(){
    yield all([call(onSignInStart),call(onSignOutStart)])
}