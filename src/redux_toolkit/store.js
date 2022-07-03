import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import homeReducer from './slices/homeSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    home: homeReducer,
  },
});
