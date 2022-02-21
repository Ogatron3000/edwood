import {configureStore} from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import watchlistReducer from './slices/watchlistSlice';
import filmsReducer from './slices/filmsSlice';
import sliderFilmsReducer from './slices/sliderFilmsSlice';

export default configureStore({
    reducer: {
        films: filmsReducer,
        sliderFilms: sliderFilmsReducer,
        auth: authReducer,
        watchlist: watchlistReducer,
    }
})
