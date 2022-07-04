import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        src: [],
        city: '',
        section: [],
        price: '',
    },
    // TODO: use immer
    reducers: {
        setSrc: {
            reducer(state, action) {
                switch (action.payload.type) {
                    case 'add': {
                        return {
                            ...state,
                            src: [...state.src, action.payload.value],
                        };
                    }
                    case 'remove': {
                        return {
                            ...state,
                            src: state.src.filter(id => id !== action.payload.value),
                        };
                    }
                    case 'reset': {
                        return {
                            ...state,
                            src: [],
                        };
                    }
                    default:
                        throw new Error();
                }
            },
            prepare(type, value) {
                return {
                    payload: { type, value },
                };
            },
        },
        setCity: {
            reducer(state, action) {
                return {
                    ...state,
                    city: action.payload,
                };
            },
        },
        setSection: {
            reducer(state, action) {
                switch (action.payload.type) {
                    case 'add': {
                        return {
                            ...state,
                            section: [...state.section, action.payload.value],
                        };
                    }
                    case 'remove': {
                        return {
                            ...state,
                            section: state.section.filter(
                                id => id !== action.payload.value
                            ),
                        };
                    }
                    case 'reset': {
                        return {
                            ...state,
                            section: [],
                        };
                    }
                    default:
                        throw new Error(
                            `Action type not exists: ${action.payload.type}.`
                        );
                }
            },
            prepare(type, value) {
                return {
                    payload: { type, value },
                };
            },
        },
        setPrice: {
            reducer(state, action) {
                return {
                    ...state,
                    price: action.payload,
                };
            },
        },
        // TODO: need a more clever mechanism for reset
        resetAll: {
            reducer() {
                return {
                    src: [],
                    city: '',
                    section: [],
                    price: '',
                };
            },
        },
    },
});

export const { setSrc, setCity, setSection, setPrice, resetAll } = filterSlice.actions;
export default filterSlice.reducer;
