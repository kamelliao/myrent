import { createSlice } from '@reduxjs/toolkit';

const houseListSlice = createSlice({
    name: 'houseList',
    initialState: {
        isLoading: false,
        houseList: [],
    },
    reducers: {
        setIsLoading(state, action) {
            return {
                ...state,
                isLoading: action.payload,
            };
        },
        setHouseList(state, action) {
            return {
                ...state,
                houseList: action.payload,
            };
        },
    },
});

export const { setIsLoading, setHouseList } = houseListSlice.actions;
export default houseListSlice.reducer;
