import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_URL_BASE
const API_KEY = process.env.REACT_APP_API_KEY

export const fetchFilms = createAsyncThunk(
    'films/fetchFilms',
    async ({filter, page}) => {
        const response = await axios.get(`${BASE_URL}movie/${filter}${API_KEY}&page=${page}`)
        return response.data
    }
)

const filmsAdapter = createEntityAdapter()

const initialState = filmsAdapter.getInitialState({
    status: 'idle',
    error: null,
    totalPages: 0,
})

export const filmsSlice = createSlice({
    name: 'films',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchFilms.pending]: (state, action) => {
            state.status = 'loading'
            state.error = null
        },
        [fetchFilms.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.totalPages = action.payload.total_pages
            filmsAdapter.setAll(state, action.payload.results)
            state.error = null
        },
        [fetchFilms.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        },
    },
})

export default filmsSlice.reducer

export const {
    selectAll: selectAllFilms,
    selectById: selectFilmById,
    selectIds: selectFilmIds,
} = filmsAdapter.getSelectors(state => state.films)
