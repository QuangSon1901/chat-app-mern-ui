import axios from 'axios';
import {
    FRIENDS_GET_SUCCESS,
    IMAGE_MESSAGE_SEND,
    MESSAGE_GET_SUCCESS,
    MESSAGE_SEND_SUCCESS,
} from '../types/messengerType';

export const getFriends = () => async (dispatch) => {
    const config = {
        headers: {},
        withCredentials: true,
    };
    try {
        const res = await axios.get('http://localhost:5000/api/messenger/get-friends', config);

        dispatch({
            type: FRIENDS_GET_SUCCESS,
            payload: {
                friends: res.data.friends,
            },
        });
    } catch (error) {
        console.log(error.response.data);
    }
};

export const messageSend = (data) => async (dispatch) => {
    const config = {
        headers: {},
        withCredentials: true,
    };
    try {
        const res = await axios.post('http://localhost:5000/api/messenger/send-message', data, config);
        dispatch({
            type: MESSAGE_SEND_SUCCESS,
            payload: {
                message: res.data.message,
            },
        });
    } catch (error) {
        console.log(error.response.data);
    }
};

export const getMessage = (id) => async (dispatch) => {
    const config = {
        headers: {},
        withCredentials: true,
    };
    try {
        const res = await axios.get(`http://localhost:5000/api/messenger/get-message/${id}`, config);

        dispatch({
            type: MESSAGE_GET_SUCCESS,
            payload: {
                message: res.data.message,
            },
        });
    } catch (error) {
        console.log(error.response.data);
    }
};

export const imageMessageSend = (data) => async (dispatch) => {
    const config = {
        headers: {},
        withCredentials: true,
    };
    try {
        const res = await axios.post('http://localhost:5000/api/messenger/image-message-send', data, config);
        dispatch({
            type: IMAGE_MESSAGE_SEND,
            payload: {
                message: res.data.message,
            },
        });
    } catch (error) {
        console.log(error.response.data);
    }
};

export const seenMessage = (msg) => async (dispatch) => {
    const config = {
        headers: {},
        withCredentials: true,
    };
    try {
        const res = await axios.post('http://localhost:5000/api/messenger/seen-message', msg, config);
    } catch (error) {
        console.log(error.response.data);
    }
};

export const updateMessage = (msg) => async (dispatch) => {
    const config = {
        headers: {},
        withCredentials: true,
    };
    try {
        const res = await axios.post('http://localhost:5000/api/messenger/delivared-message', msg, config);
    } catch (error) {
        console.log(error.response.data);
    }
};
