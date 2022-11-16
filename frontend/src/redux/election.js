import { createSlice } from "@reduxjs/toolkit";

export const electionSlice = createSlice({
    name: 'election',
    initialState: {
        value: {
            id: '',
            title: '',
            startTime: '',
            endTime: '',
            code: '',
            description: '',
            launched: false,
            address: ''
        }
    },
    reducers: {
        viewElection: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const {viewElection} = electionSlice.actions;

export default electionSlice.reducer;