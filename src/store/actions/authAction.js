import axios from 'axios';
import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS } from '../types/authType';

export const userRegister = (data) => {
    return async (dispatch) => {
        const config = {
            headers: {},
            withCredentials: true,
        };
        try {
            const res = await axios.post('http://localhost:5000/api/messenger/user-register', data, config);

            localStorage.setItem('authToken', JSON.stringify(res.data.token));

            dispatch({
                type: REGISTER_SUCCESS,
                payload: {
                    successMessage: res.data.successMessage,
                    token: res.data.token,
                },
            });
        } catch (error) {
            dispatch({
                type: REGISTER_FAIL,
                payload: {
                    error: error.response.data.error.errorMessage,
                },
            });
        }
    };
};

export const userLogin = (data) => {
    return async (dispatch) => {
        const config = {
            headers: {},
            withCredentials: true,
        };
        try {
            const res = await axios.post('http://localhost:5000/api/messenger/user-login', data, config);
            localStorage.setItem('authToken', JSON.stringify(res.data.token));

            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    successMessage: res.data.successMessage,
                    token: res.data.token,
                },
            });
        } catch (error) {
            dispatch({
                type: LOGIN_FAIL,
                payload: {
                    error: error.response.data.error.errorMessage,
                },
            });
        }
    };
};

export const userLogout = () => async (dispatch) => {
    const config = {
        headers: {},
        withCredentials: true,
    };
    try {
        const res = await axios.post('http://localhost:5000/api/messenger/user-logout', {}, config);
        if (res.data.success) {
            localStorage.removeItem('authToken');
            dispatch({
                type: LOGOUT_SUCCESS,
            });
        }
    } catch (error) {}
};
