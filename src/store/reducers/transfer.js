import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    sender: {
        id: "",
        username: "",
        email: "",
        currentBalance: "",
        accountNumber:"",
        accountType:""
    },
    receiver: {
        id: "",
        username: "",
        email: "",
        currentBalance: "",
        accountNumber:"",
        accountType:""
    },
    transfer: false
}

const reducer = (state=initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_SENDER:
            return updateObject(state, {
                sender: {
                    id: action.data.id,
                    username: action.data.username,
                    email: action.data.email,
                    currentBalance: action.data.currentBalance,
                    accountNumber: action.data.accountNumber,
                    accountType: action.data.accountType
                }
            });
        case actionTypes.ADD_RECEIVER:
            return updateObject(state, {
                receiver: {
                    id: action.data.id,
                    username: action.data.username,
                    email: action.data.email,
                    currentBalance: action.data.currentBalance,
                    accountNumber: action.data.accountNumber,
                    accountType: action.data.accountType
                }
            });
        case actionTypes.TRANSFER_SUCCESS:
            return updateObject(state, {
                transfer: true
            });
        case actionTypes.TRANSFER_COMPLETE:
            return updateObject(state, {
                transfer: false
            });
        default:
            return state;
    }
}

export default reducer;