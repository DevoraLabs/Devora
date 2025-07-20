import { createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user || {
    isLoggedIn: false,
    username: null
}

const userSlice = createSlice ({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.username = action.payload;
            localStorage.setItem("user", JSON.stringify(state));
        },
        logout: (state, action) => {
            state.isLoggedIn = false;
            state.username = null;
            localStorage.removeItem("user");
        }
    }
})

export const {login, logout} = userSlice.actions;
export default userSlice.reducer;