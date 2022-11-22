import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        value: {
            id: '',
            firstName: '',
            lastName: '',
            email: ''
        }
    },
    reducers: {
        updateUser: (state, action) => {
            state.value = {...state.value, ...action.payload};
        }
    }
});

export const {updateUser} = userSlice.actions;

export default userSlice.reducer;