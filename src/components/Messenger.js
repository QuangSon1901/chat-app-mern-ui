import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsThreeDots } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import { BiSearch } from 'react-icons/bi';
import { io } from 'socket.io-client';
import toast, { Toaster } from 'react-hot-toast';

import ActiveFriend from './ActiveFriend';
import Friends from './Friends';
import RightSide from './RightSide';
import {
    getFriends,
    getMessage,
    imageMessageSend,
    messageSend,
    seenMessage,
    updateMessage,
} from '~/store/actions/messengerAction';
import {
    DELIVARED_MESSAGE,
    MESSAGE_GET_SUCCESS_CLEAR,
    MESSAGE_SEND_SUCCESS_CLEAR,
    NEW_USER_ADD,
    NEW_USER_ADD_CLEAR,
    SEEN_ALL,
    SEEN_MESSAGE,
    SOCKET_MESSAGE,
    UPDATE,
    UPDATE_FRIEND_MESSAGE,
} from '~/store/types/messengerType';
import useSound from 'use-sound';
import notificationSound from '../audio/notification.mp3';
import sendingSound from '../audio/sending.mp3';
import { IoLogOutOutline } from 'react-icons/io5';
import { userLogout } from '~/store/actions/authAction';

const Messenger = () => {
    const dispatch = useDispatch();
    const [notificationSPlay] = useSound(notificationSound);
    const [sendingSPlay] = useSound(sendingSound);

    const scrollRed = useRef();
    const socket = useRef();

    const { friends, message, new_user_add, messageSendSuccess, message_get_success } = useSelector(
        (state) => state.messenger,
    );
    const { myInfo } = useSelector((state) => state.auth);

    const [currentFriend, setCurrentFriend] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const [activeUser, setActiveUser] = useState([]);
    const [socketMessage, setSocketMessage] = useState('');
    const [typingMessage, setTypingMessage] = useState('');

    useEffect(() => {
        socket.current = io('https://api.qsc-messenger.site/');
        socket.current.on('getMessage', (data) => {
            setSocketMessage(data);
        });
        socket.current.on('typingMessageGet', (data) => {
            setTypingMessage(data);
        });
        socket.current.on('msgSeenResponse', (msg) => {
            dispatch({
                type: SEEN_MESSAGE,
                payload: {
                    msgInfo: msg,
                },
            });
        });
        socket.current.on('msgDelivaredResponse', (msg) => {
            dispatch({
                type: DELIVARED_MESSAGE,
                payload: {
                    msgInfo: msg,
                },
            });
        });
        socket.current.on('seenSuccess', (data) => {
            dispatch({
                type: SEEN_ALL,
                payload: data,
            });
        });
    }, []);

    useEffect(() => {
        socket.current.emit('addUser', myInfo.id, myInfo);
    }, []);

    useEffect(() => {
        socket.current.on('getUser', (users) => {
            const filterUser = users.filter((u) => u.userId !== myInfo.id && u.userId !== null);
            setActiveUser(filterUser);
        });
        socket.current.on('new_user_add', (data) => {
            dispatch({
                type: NEW_USER_ADD,
                payload: {
                    new_user_add: data,
                },
            });
        });
    }, []);

    useEffect(() => {
        if (socketMessage && currentFriend) {
            if (socketMessage.senderId === currentFriend._id && socketMessage.receiveId === myInfo.id) {
                dispatch({
                    type: SOCKET_MESSAGE,
                    payload: {
                        message: socketMessage,
                    },
                });
                dispatch(seenMessage(socketMessage));
                socket.current.emit('messageSeen', socketMessage);
                dispatch({
                    type: UPDATE_FRIEND_MESSAGE,
                    payload: {
                        msgInfo: socketMessage,
                        status: 'seen',
                    },
                });
            }
        }
        setSocketMessage('');
    }, [socketMessage]);

    useEffect(() => {
        if (socketMessage && socketMessage.senderId !== currentFriend._id && socketMessage.receiveId === myInfo.id) {
            notificationSPlay();
            toast.success(`${socketMessage.senderName} send a new message`);
            dispatch(updateMessage(socketMessage));
            socket.current.emit('delivaredMessage', socketMessage);
            dispatch({
                type: UPDATE_FRIEND_MESSAGE,
                payload: {
                    msgInfo: socketMessage,
                    status: 'delivared',
                },
            });
        }
    }, [socketMessage]);

    const inputHandle = (e) => {
        setNewMessage(e.target.value);

        socket.current.emit('typingMessage', {
            senderId: myInfo.id,
            receiveId: currentFriend._id,
            msg: e.target.value,
        });
    };

    const sendMessage = (e) => {
        e.preventDefault();
        sendingSPlay();
        const data = {
            senderName: myInfo.userName,
            receiveId: currentFriend._id,
            message: newMessage ? newMessage : '????',
        };

        dispatch(messageSend(data));
        socket.current.emit('typingMessage', {
            senderId: myInfo.id,
            receiveId: currentFriend._id,
            msg: '',
        });
        setNewMessage('');
    };

    const emojiSend = (emu) => {
        setNewMessage(`${newMessage}${emu}`);
        socket.current.emit('typingMessage', {
            senderId: myInfo.id,
            receiveId: currentFriend._id,
            msg: emu,
        });
    };

    const imageSend = (e) => {
        if (e.target.files.length !== 0) {
            sendingSPlay();

            const formData = new FormData();
            formData.append('senderName', myInfo.userName);
            formData.append('receiveId', currentFriend._id);
            formData.append('image', e.target.files[0]);

            dispatch(imageMessageSend(formData));
        }
    };

    useEffect(() => {
        if (messageSendSuccess) {
            socket.current.emit('sendMessage', message[message.length - 1]);
            dispatch({
                type: UPDATE_FRIEND_MESSAGE,
                payload: {
                    msgInfo: message[message.length - 1],
                },
            });
            dispatch({
                type: MESSAGE_SEND_SUCCESS_CLEAR,
            });
        }
    }, [messageSendSuccess]);

    useEffect(() => {
        dispatch(getFriends());
        dispatch({
            type: NEW_USER_ADD_CLEAR,
        });
    }, [new_user_add]);

    useEffect(() => {
        if (friends && friends.length > 0) {
            setCurrentFriend(friends[0].fndInfo);
        }
    }, [friends]);

    useEffect(() => {
        dispatch(getMessage(currentFriend._id));
    }, [currentFriend?._id]);

    useEffect(() => {
        if (message.length > 0) {
            if (message[message.length - 1].senderId !== myInfo.id && message[message.length - 1].status !== 'seen') {
                dispatch({
                    type: UPDATE,
                    payload: {
                        id: currentFriend._id,
                    },
                });
                socket.current.emit('seen', {
                    senderId: currentFriend._id,
                    receiveId: myInfo.id,
                });
                dispatch(
                    seenMessage({
                        _id: message[message.length - 1]._id,
                    }),
                );
            }
        }
        dispatch({
            type: MESSAGE_GET_SUCCESS_CLEAR,
        });
    }, [message_get_success]);

    useEffect(() => {
        scrollRed.current?.scrollIntoView({ behavior: 'smooth' });
    }, [message]);

    const [hide, setHide] = useState(true);

    const logout = () => {
        dispatch(userLogout());
        socket.current.emit('logout', myInfo.id);
    };

    const search = (e) => {
        const getFriendsClass = document.getElementsByClassName('hover-friend');
        const friendNameClass = document.getElementsByClassName('fd_name');
        for (let i = 0; i < getFriendsClass.length, i < friendNameClass.length; i++) {
            let text = friendNameClass[i].innerText.toLowerCase();
            if (text.indexOf(e.target.value.toLowerCase()) > -1) {
                getFriendsClass[i].style.display = '';
            } else {
                getFriendsClass[i].style.display = 'none';
            }
        }
    };

    return (
        <div className="messenger">
            <Toaster
                position={'top-right'}
                reverseOrder={false}
                toastOptions={{
                    style: {
                        fontSize: '18px',
                    },
                }}
            />
            <div className="row">
                <div className="col-3 left-side-col">
                    <div className="left-side">
                        <div className="top">
                            <div className="image-name">
                                <div className="image">
                                    <img src={myInfo.image} alt="" />
                                </div>
                                <div className="name">
                                    <h3>{myInfo.userName}</h3>
                                </div>
                            </div>
                            <div className="icons">
                                <div className="icon" onClick={() => setHide(!hide)}>
                                    <BsThreeDots />
                                </div>
                                <div className="icon">
                                    <FaEdit />
                                </div>
                                <div className={`theme-logout ${!hide ? 'show' : ''}`}>
                                    <h1>Dark mode</h1>
                                    <div className="on">
                                        <label htmlFor="dark">ON</label>
                                        <input value="dark" type="radio" id="dark" name="theme" />
                                    </div>
                                    <div className="of">
                                        <label htmlFor="white">OFF</label>
                                        <input value="white" type="radio" id="white" name="theme" />
                                    </div>
                                    <div className="logout" onClick={logout}>
                                        <IoLogOutOutline />
                                        Logout
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="friend-search">
                            <div className="search">
                                <button>
                                    <BiSearch />
                                </button>
                                <input onChange={search} type="text" placeholder="Search" className="form-control" />
                            </div>
                        </div>
                        {/* <div className="active-friends">
                            {activeUser && activeUser.length > 0 ? (
                                <ActiveFriend setCurrentFriend={setCurrentFriend} activeUser={activeUser} />
                            ) : (
                                ''
                            )}
                        </div> */}
                        <div className="friends">
                            {friends && friends.length > 0
                                ? friends.map((friend) => (
                                      <div
                                          key={friend.fndInfo._id}
                                          onClick={() => setCurrentFriend(friend.fndInfo)}
                                          className={`hover-friend ${
                                              currentFriend._id === friend.fndInfo._id ? 'active' : ''
                                          }`}
                                      >
                                          <Friends friend={friend} myId={myInfo.id} activeUser={activeUser} />
                                      </div>
                                  ))
                                : 'No friend'}
                        </div>
                    </div>
                </div>
                {currentFriend ? (
                    <RightSide
                        currentFriend={currentFriend}
                        inputHandle={inputHandle}
                        newMessage={newMessage}
                        sendMessage={sendMessage}
                        message={message}
                        myInfo={myInfo}
                        scrollRed={scrollRed}
                        emojiSend={emojiSend}
                        imageSend={imageSend}
                        activeUser={activeUser}
                        typingMessage={typingMessage}
                    />
                ) : (
                    'Please select your friend'
                )}
            </div>
        </div>
    );
};

export default Messenger;
