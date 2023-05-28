import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        setUser: (state, action) => {
            return action.payload;
        },

        removeUserFromApp: (state, action) => {
            return {};
        },
    },
});

const { actions, reducer } = user;
export const { setUser, removeUserFromApp } = actions;
export default reducer;
