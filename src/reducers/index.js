import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userReducer';
import { productReducer } from './productReducer';
import reduxThunk from 'redux-thunk'

export const rootStore = configureStore({
    // untuk mengelompokan seluruh reducernya
    // agar di index.js react tidak perlu import satu per satu
    reducer: {
        userReducer,
        productReducer
    }
}, applyMiddleware(reduxThunk));