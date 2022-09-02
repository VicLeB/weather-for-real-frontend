import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const {
                id,
                username,
                home_location_code
            } = action.payload;

            state.isLoggedIn = true;
            state.username = username;
            state.homeLocationCode = home_location_code;
            state.id = id;
        },
        logout: () => {
            return initialState;
        },
    },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
