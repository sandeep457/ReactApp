import axios from 'axios';
import * as actionTypes from '../actions/actionTypes';

const addAllUsers = (data) => {
    return {
        type: actionTypes.GET_ALL_USERS,
        data: data
    }
}

const addUser = (data) => {
    return {
        type: actionTypes.GET_USER,
        data: data
    }
}

export const getAllUsers = () => {
    return dispatch => {
        axios.get("users.json").then(response => {
            dispatch(addAllUsers(response.data));
        }).catch(error => {
            console.log(error);
        })
    }
}

export const getUser = () => {
    return dispatch => {
        axios.get("users/wikx56m8bnYT7U36w9VFtGfzZ6Q2").then(response => {
            dispatch(addUser(response.data));
        }).catch(error => {
            console.log(error);
        })
    }
}