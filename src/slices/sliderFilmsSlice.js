import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_URL_BASE
const API_KEY = process.env.REACT_APP_API_KEY

export const fetchSliderFilms = createAsyncThunk(
    'sliderFilms/fetchSliderFilms',
    async () => {
        const response = await axios.get(`${BASE_URL}movie/now_playing${API_KEY}`)
        return response.data.results
    }
)

export const fetchGenres = createAsyncThunk(
    'films/fetchGenres',
    async () => {
        const response = await axios.get(`${BASE_URL}genre/movie/list${API_KEY}`)
        return response.data.genres
    }
)

export const sliderFilmsSlice = createSlice({
    name: 'sliderFilms',
    initialState: {
        sliderFilms: [],
        genres: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: {
        [fetchSliderFilms.pending]: (state, action) => {
            state.status = 'loading'
            state.error = null
        },
        [fetchSliderFilms.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.sliderFilms = action.payload
            state.error = null
        },
        [fetchSliderFilms.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        },

        [fetchGenres.pending]: (state, action) => {
            state.status = 'loading'
            state.error = null
        },
        [fetchGenres.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.genres = action.payload
            state.error = null
        },
        [fetchGenres.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        },
    }})

export default sliderFilmsSlice.reducer
