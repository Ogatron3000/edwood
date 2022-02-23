import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {fetchWatchlist} from "./watchlistSlice";

const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;
const SIGN_IN_ENDPOINT = 'signInWithPassword';
const SIGN_UP_ENDPOINT = 'signUp';

export const auth = createAsyncThunk(
    'auth/authenticate',
    async ({formValues, pathname}, thunkApi) => {
        const endpoint = pathname === '/sign-in' ? SIGN_IN_ENDPOINT : SIGN_UP_ENDPOINT
        try {
            const response =
                await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:${endpoint}?key=${API_KEY}`,
                    {...formValues, returnSecureToken: true});
            const user = putUserInLocalStorage(response);
            const {userId, token} = user;
            await thunkApi.dispatch(fetchWatchlist({userId, token}));
            return user;
        } catch (e) {
            const message = e.response.data.error.message
            return thunkApi.rejectWithValue(prettifyErrorMessage(message));
        }
    },
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
    name: 'auth',
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
        [auth.pending]: (state, action) => {
            state.status = 'loading'
            state.error = null
        },
        [auth.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.userData = action.payload
            state.isLoggedIn = true
            state.error = null
        },
        [auth.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        },
    },
})

export const { signOut } = authSlice.actions;

export default authSlice.reducer;



// Helpers

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
    const prettyMsg = msg[0].toUpperCase() + msg.slice(1) + '.'
    if (msg.includes('email')) {
        return {email: prettyMsg}
    }
    return {password: prettyMsg}
}
