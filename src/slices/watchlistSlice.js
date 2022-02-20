import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const DB_URL = process.env.REACT_APP_FIREBASE_DB_URL;

export const fetchWatchlist = createAsyncThunk('watchlist/fetchWatchlist', async ({userId, token}) => {
    const response = await axios.get(`https://${DB_URL}/watchlist/${userId}.json?auth=${token}`)
    return Object.values(response.data)
})

export const addToWatchlist = createAsyncThunk('watchlist/addToWatchlist', async ({film, userId, token}) => {
    const response = await axios.put(`https://${DB_URL}/watchlist/${userId}/${film.id}.json?auth=${token}`,
        film)
    return response.data
})

export const removeFromWatchlist = createAsyncThunk('watchlist/removeFromWatchlist', async ({filmId, userId, token}) => {
    await axios.delete(`https://${DB_URL}/watchlist/${userId}/${filmId}.json?auth=${token}`)
    return filmId
})

export const watchlistSlice = createSlice({
    name: 'watchlist',
    initialState: {
        films: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: {
        [fetchWatchlist.pending]: (state, action) => {
            state.status = 'loading'
            state.error = null
        },
        [fetchWatchlist.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.films = action.payload
            state.error = null
        },
        [fetchWatchlist.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        },

        [addToWatchlist.pending]: (state, action) => {
            state.status = 'loading'
            state.error = null
        },
        [addToWatchlist.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            if (!state.films.find(film => film.id === action.payload.id)) {
                state.films.push(action.payload)
            }
            state.error = null
        },
        [addToWatchlist.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        },

        [removeFromWatchlist.pending]: (state, action) => {
            state.status = 'loading'
            state.error = null
        },
        [removeFromWatchlist.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.films = state.films.filter(film => film.id !== action.payload)
            state.error = null
        },
        [removeFromWatchlist.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        },

        // listen to action from auth slice
        'auth/signOut': (state, action) => {
            state.films = []
            state.status = 'idle'
            state.error = null
        }
    }
})

export default watchlistSlice.reducer;
