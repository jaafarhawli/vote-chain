import { createSlice } from "@reduxjs/toolkit";

export const voterSlice = createSlice({
    name: 'voter',
    initialState: {
        value: {
            id: '',
            email: '',
            electionId: '',
            voted: false,
            chosenParty: '',
            chosenCandidate: '',
        }
    },
    reducers: {
        updateVoter: (state, action) => {
            state.value = {...state.value, ...action.payload};
        }
    }
});

export const {updateVoter} = voterSlice.actions;

export default voterSlice.reducer;