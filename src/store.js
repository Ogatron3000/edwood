import {configureStore} from "@reduxjs/toolkit";
import currentUserReducer from './slices/authSlice';

export default configureStore({
    reducer: {
        currentUser: currentUserReducer
    }
})
