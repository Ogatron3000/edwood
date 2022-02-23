import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

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
            const user = putUserInLocalStorage(response.data);
            return user;
        } catch (e) {
            const message = e.response.data.error.message
            return thunkApi.rejectWithValue(prettifyErrorMessage(message));
        }
    },
)

export const refreshToken = createAsyncThunk(
    'auth/refreshToken',
    async (_, {getState}) => {
        const response = await axios.post(`https://securetoken.googleapis.com/v1/token?key=${API_KEY}`, {
            grant_type: 'refresh_token',
            refresh_token: getState().auth.userData.refreshToken
        })
        const userData = prepareObjForLocalStorage(response)
        const user = putUserInLocalStorage(userData)
        return user
    }
)

const initialState = {
    userData: {
        userId: localStorage.getItem('userId'),
        token: localStorage.getItem('token'),
        expirationDate: localStorage.getItem('expirationDate'),
        refreshToken: localStorage.getItem('refreshToken'),
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
                refreshToken: null,
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

        [refreshToken.pending]: (state, action) => {
            state.status = 'loading'
            state.error = null
        },
        [refreshToken.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.userData = action.payload
            state.isLoggedIn = true
            state.error = null
        },
        [refreshToken.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        },
    },
})

export const { signOut } = authSlice.actions;

export default authSlice.reducer;



// Helpers

function putUserInLocalStorage({ localId, idToken, expiresIn, refreshToken }) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000).toString();
    localStorage.setItem('token', idToken);
    localStorage.setItem('expirationDate', expirationDate);
    localStorage.setItem('userId', localId);
    localStorage.setItem('refreshToken', refreshToken)
    return {
        userId: localId,
        token: idToken,
        expirationDate,
        refreshToken,
    };
}

function prepareObjForLocalStorage(response) {
    const {user_id, id_token, expires_in, refresh_token} = response.data
    return {
        localId: user_id,
        idToken: id_token,
        expiresIn: expires_in,
        refreshToken: refresh_token
    }
}

function prettifyErrorMessage(error) {
    const msg = error.toLowerCase().split("_").join(" ");
    const prettyMsg = msg[0].toUpperCase() + msg.slice(1) + '.'
    if (msg.includes('email')) {
        return {email: prettyMsg}
    }
    return {password: prettyMsg}
}
