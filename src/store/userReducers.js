import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    existingUser : null,
    error : null,
    loading : false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signinStart : (state) => {
            state.loading = true;
        },
        signinSuccess : (state, action) => {
            state.existingUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signinFailure : (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        signUpStart : (state) => {
            state.loading = true;
        },
        signUpSuccess : (state, action) => {
            state.existingUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signUpFailure : (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        updateStart : (state) => {
            state.loading = true;
        },
        updateSuccess : (state, action) => {
            state.existingUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateFailure : (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        signOutUserStart: (state) => {
            state.loading = true;
        },
        signOutUserSuccess: (state) => {
            state.existingUser = null;  // Reset existingUser on sign out
            state.loading = false;
            state.error = null;
        },
        signOutUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    }
});

export const { 
    signinStart, signinSuccess, signinFailure,
    signUpStart, signUpSuccess, signUpFailure,
    updateStart, updateSuccess, updateFailure, 
    signOutUserStart, signOutUserSuccess, signOutUserFailure
} = userSlice.actions;

export default userSlice.reducer;