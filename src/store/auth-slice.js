import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

const initialState = {
    user: null,
};

if (localStorage.getItem("jwtToken")) {
    const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));
    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("jwtToken");
    } else {
        initialState.user = decodedToken;
    }
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        login(state, action) {
            state.user = action.payload;
            localStorage.setItem("jwtToken", action.payload.token);
        },
        logout(state) {
            state.user = null;
            localStorage.removeItem("jwtToken");
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
