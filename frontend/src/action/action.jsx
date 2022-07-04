import React from 'react';
import { setIsLoading, setHouseList } from '../reducers/houseListSlice';

function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
}

export function fetchHouseList() {
    return dispatch => {
        fetch('/api/data')
            .then(res => res.json())
            .then(data => {
                dispatch(setHouseList(data));
                dispatch(setIsLoading(false));
            })
            .catch(error => {
                console.log(error);
            });
    };
}
