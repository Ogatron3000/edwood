import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const signIn = createAsyncThunk(
    'currentUser/signIn',
    async function(data, {rejectWithValue}) {
        data = {...data, returnSecureToken: true}
        const key = process.env.REACT_APP_FIREBASE_API_KEY;
        try {
            const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`, data);
            return putUserInLocalStorage(response);
        } catch (e) {
            const error = e.response.data.error.message.toLowerCase().split("_").join(" ");
            return rejectWithValue(error);
        }
    }
)

export const signUp = createAsyncThunk(
    'currentUser/signUp',
    async function(data, {rejectWithValue}) {
        data = {...data, returnSecureToken: true}
        const key = process.env.REACT_APP_FIREBASE_API_KEY;
        try {
            const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`, data);;
            return putUserInLocalStorage(response);
        } catch (e) {
            console.log(e.response)
            const error = e.response.data.error.message.toLowerCase().split("_").join(" ");
            return rejectWithValue(error);
        }
    }
)

const initialState = {
    userData: {
        userId: localStorage.getItem('userId'),
        token: localStorage.getItem('token'),
        expirationDate: localStorage.getItem('expirationDate'),
    },
    isLoggedIn: !!localStorage.getItem('token'),
    status: 'idle',
    error: null,
}

export const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {},
    extraReducers: {
        [signIn.pending]: (state, action) => {
            state.status = 'loading'
        },
        [signIn.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.userData = action.payload
        },
        [signIn.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        },

        [signUp.pending]: (state, action) => {
            state.status = 'loading'
        },
        [signUp.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.userData = action.payload
        },
        [signUp.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        },
    },
})

export default currentUserSlice.reducer;

function putUserInLocalStorage(response) {
    const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
    localStorage.setItem('token', response.data.idToken);
    localStorage.setItem('expirationDate', expirationDate);
    localStorage.setItem('userId', response.data.localId);
    return {
        userId: response.data.localId,
        token: response.data.idToken,
        expirationDate,
    };
}
