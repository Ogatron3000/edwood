import {configureStore} from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import watchlistReducer from './slices/watchlistSlice';

export default configureStore({
    reducer: {
        auth: authReducer,
        watchlist: watchlistReducer,
    }
})
