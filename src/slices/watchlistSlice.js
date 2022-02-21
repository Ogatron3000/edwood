import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
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

const watchlistAdapter = createEntityAdapter();

const initialState = watchlistAdapter.getInitialState({
    status: 'idle',
    error: null,
})

export const watchlistSlice = createSlice({
    name: 'watchlist',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchWatchlist.fulfilled]: watchlistAdapter.setAll,
        [addToWatchlist.fulfilled]: watchlistAdapter.addOne,
        [removeFromWatchlist.fulfilled]: watchlistAdapter.removeOne,

        // listen to action from auth slice
        'auth/signOut': (state, action) => {
            state.ids = []
            state.entities = {}
            state.status = 'idle'
            state.error = null
        }
    }
})

export default watchlistSlice.reducer;

export const {
    selectAll: selectAllFilms,
    selectById: selectFilmById,
    selectIds: selectFilmIds,
} = watchlistAdapter.getSelectors(state => state.watchlist)
