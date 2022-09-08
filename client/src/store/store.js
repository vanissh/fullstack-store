import { configureStore } from '@reduxjs/toolkit';
import { reducer as userReducer } from '../slices/userSlice';
import { reducer as deviceReducer } from '../slices/deviceSlice';

const store = configureStore({
    reducer: {userReducer, deviceReducer},
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    }),
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;