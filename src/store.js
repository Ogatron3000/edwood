import {configureStore} from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import watchlistReducer from './slices/watchlistSlice';
import {apiSlice} from "./slices/apiSlice";

export default configureStore({
    reducer: {
        auth: authReducer,
        watchlist: watchlistReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware)
})
