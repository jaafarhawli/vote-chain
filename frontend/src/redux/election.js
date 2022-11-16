import { createSlice } from "@reduxjs/toolkit";

export const electionSlice = createSlice({
    name: 'election',
    initialState: {
        value: {
            id: '',
            title: '',
            startTime: '',
            endTime: '',
            description: ''
        }
    },
    reducers: {
        viewElection: (state, action) => {
            state.value = action.payload;
        }
    }
});

export default electionSlice.reducer;