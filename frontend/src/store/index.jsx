import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import filterReducer from '../reducers/filterSlice';
import houseListSlice from '../reducers/houseListSlice';

const store = configureStore({
    reducer: {
        filter: filterReducer,
        houseList: houseListSlice,
    },
    middleware: [thunk],
});

export default store;
