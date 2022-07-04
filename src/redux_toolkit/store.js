import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import homeReducer from './slices/homeSlice';
import sagas from '../redux_saga/sagas';
import createSagaMiddleware from '@redux-saga/core';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    user: userReducer,
    home: homeReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(sagas);


