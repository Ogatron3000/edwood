import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;
const SIGN_IN_ENDPOINT = 'signInWithPassword';
const SIGN_UP_ENDPOINT = 'signUp';

export const signIn = createAsyncThunk(
    'currentUser/signIn',
    async (data, thunkApi) => auth(data, thunkApi, SIGN_IN_ENDPOINT),
)

export const signUp = createAsyncThunk(
    'currentUser/signIn',
    async (data, thunkApi) => auth(data, thunkApi, SIGN_UP_ENDPOINT),
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

export const authSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        signOut(state, action) {
            state.userData =  {
                userId: null,
                token: null,
                expirationDate: null,
            }
            state.isLoggedIn = false
            state.status = 'idle'
            state.error = null
        }
    },
    extraReducers: {
        [signIn.pending]: (state, action) => {
            state.status = 'loading'
            state.error = null
        },
        [signIn.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.userData = action.payload
            state.isLoggedIn = true
            state.error = null
        },
        [signIn.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        },

        [signUp.pending]: (state, action) => {
            state.status = 'loading'
            state.error = null
        },
        [signUp.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.userData = action.payload
            state.isLoggedIn = true
            state.error = null
        },
        [signUp.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        },
    },
})

export const { signOut } = authSlice.actions;

export default authSlice.reducer;



// Helpers

async function auth(data, thunkApi, endpoint) {
    data = {...data, returnSecureToken: true}
    try {
        const response =
            await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:${endpoint}?key=${API_KEY}`, data);
        return putUserInLocalStorage(response);
    } catch (e) {
        const message = e.response.data.error.message
        return thunkApi.rejectWithValue(prettifyErrorMessage(message));
    }
}

function putUserInLocalStorage(response) {
    const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000).toString();
    localStorage.setItem('token', response.data.idToken);
    localStorage.setItem('expirationDate', expirationDate);
    localStorage.setItem('userId', response.data.localId);
    return {
        userId: response.data.localId,
        token: response.data.idToken,
        expirationDate,
    };
}

function prettifyErrorMessage(error) {
    const msg = error.toLowerCase().split("_").join(" ");
    return msg[0].toUpperCase() + msg.slice(1) + '.'
}
