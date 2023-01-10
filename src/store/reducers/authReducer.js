import {
    ERROR_MESSAGE_CLEAR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    SUCCESS_MESSAGE_CLEAR,
} from '../types/authType';
import decodeToken from 'jwt-decode';

const authState = {
    loading: true,
    authenticate: false,
    error: '',
    successMessage: '',
    myInfo: '',
};

const tokenDecode = (token) => {
    const tokenDecoded = decodeToken(token);
    const expTime = new Date(tokenDecoded.exp * 1000);
    if (new Date() > expTime) {
        return null;
    }

    return tokenDecoded;
};

const getToken = localStorage.getItem('authToken');

if (getToken) {
    const getInfo = tokenDecode(getToken);
    if (getInfo) {
        authState.myInfo = getInfo;
        authState.authenticate = true;
        authState.loading = false;
    }
}

export const authReducer = (state = authState, action) => {
    const { payload, type } = action;

    switch (type) {
        case REGISTER_FAIL:
        case LOGIN_FAIL:
            return {
                ...state,
                error: payload.error,
                authenticate: false,
                myInfo: '',
                successMessage: '',
                loading: true,
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            const myInfo = tokenDecode(payload.token);
            return {
                ...state,
                authenticate: true,
                successMessage: payload.successMessage,
                myInfo,
                error: '',
                loading: false,
            };
        case SUCCESS_MESSAGE_CLEAR:
            return {
                ...state,
                successMessage: '',
            };
        case ERROR_MESSAGE_CLEAR:
            return {
                ...state,
                error: '',
            };
        default:
            return state;
    }
};
