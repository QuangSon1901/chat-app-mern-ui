import {
    DELIVARED_MESSAGE,
    FRIENDS_GET_SUCCESS,
    IMAGE_MESSAGE_SEND,
    MESSAGE_GET_SUCCESS,
    MESSAGE_GET_SUCCESS_CLEAR,
    MESSAGE_SEND_SUCCESS,
    MESSAGE_SEND_SUCCESS_CLEAR,
    SEEN_ALL,
    SEEN_MESSAGE,
    SOCKET_MESSAGE,
    UPDATE,
    UPDATE_FRIEND_MESSAGE,
} from '../types/messengerType';

const messengerState = {
    friends: [],
    message: [],
    messageSendSuccess: false,
    message_get_success: false,
};

export const messengerReducer = (state = messengerState, action) => {
    const { payload, type } = action;
    switch (type) {
        case FRIENDS_GET_SUCCESS:
            return {
                ...state,
                friends: payload.friends,
            };
        case MESSAGE_GET_SUCCESS:
            return {
                ...state,
                message: payload.message,
                message_get_success: true,
            };
        case MESSAGE_SEND_SUCCESS:
            return {
                ...state,
                message: [...state.message, payload.message],
                messageSendSuccess: true,
            };
        case IMAGE_MESSAGE_SEND:
            return {
                ...state,
                message: [...state.message, payload.message],
            };
        case SOCKET_MESSAGE:
            return {
                ...state,
                message: [...state.message, payload.message],
            };
        case UPDATE_FRIEND_MESSAGE:
            const index_ufm = state.friends.findIndex(
                (f) => f.fndInfo._id === payload.msgInfo.receiveId || f.fndInfo._id === payload.msgInfo.senderId,
            );
            state.friends[index_ufm].msgInfo = payload.msgInfo;
            state.friends[index_ufm].msgInfo.status = payload.status;
            return state;
        case MESSAGE_SEND_SUCCESS_CLEAR:
            return {
                ...state,
                messageSendSuccess: false,
            };
        case SEEN_MESSAGE:
            const index_sm = state.friends.findIndex(
                (f) => f.fndInfo._id === payload.msgInfo.receiveId || f.fndInfo._id === payload.msgInfo.senderId,
            );
            state.friends[index_sm].msgInfo.status = 'seen';
            return {
                ...state,
            };
        case DELIVARED_MESSAGE:
            const index_dm = state.friends.findIndex(
                (f) => f.fndInfo._id === payload.msgInfo.receiveId || f.fndInfo._id === payload.msgInfo.senderId,
            );
            state.friends[index_dm].msgInfo.status = 'delivared';
            return {
                ...state,
            };
        case UPDATE:
            const index_ud = state.friends.findIndex((f) => f.fndInfo._id === payload.id);
            if (state.friends[index_ud].msgInfo) {
                state.friends[index_ud].msgInfo.status = 'seen';
            }

            return {
                ...state,
            };
        case MESSAGE_GET_SUCCESS_CLEAR:
            return {
                ...state,
                message_get_success: false,
            };
        case SEEN_ALL:
            const index_sa = state.friends.findIndex((f) => f.fndInfo._id === payload.receiveId);
            state.friends[index_sa].msgInfo.status = 'seen';
            return {
                ...state,
            };
        default:
            return state;
    }
};
