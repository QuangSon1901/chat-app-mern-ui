import React from 'react';
import { IoCall } from 'react-icons/io5';
import { BsCameraVideoFill } from 'react-icons/bs';
import { HiDotsCircleHorizontal } from 'react-icons/hi';
import Message from './Message';
import MessageSend from './MessageSend';
import FriendInfo from './FriendInfo';

const RightSide = ({
    imageSend,
    myInfo,
    emojiSend,
    scrollRed,
    message,
    sendMessage,
    currentFriend,
    newMessage,
    inputHandle,
    activeUser,
    typingMessage,
}) => {
    return (
        <div className="col-9">
            <div className="right-side">
                <input type="checkbox" id="dot" />
                <div className="row">
                    <div className="col-8">
                        <div className="message-send-show">
                            <div className="header">
                                <div className="image-name">
                                    <div className="image">
                                        <img
                                            src={`http://localhost:5000/public/uploads/${currentFriend.image}`}
                                            alt=""
                                        />
                                        {activeUser &&
                                        activeUser.length > 0 &&
                                        activeUser.some((u) => u.userId === currentFriend._id) ? (
                                            <div className="active-icon"></div>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                    <div className="name">
                                        <h3>{currentFriend.userName}</h3>
                                    </div>
                                </div>
                                <div className="icons">
                                    <div className="icon">
                                        <IoCall />
                                    </div>
                                    <div className="icon">
                                        <BsCameraVideoFill />
                                    </div>
                                    <label htmlFor="dot">
                                        <div className="icon">
                                            <HiDotsCircleHorizontal />
                                        </div>
                                    </label>
                                </div>
                            </div>
                            <Message
                                scrollRed={scrollRed}
                                currentFriend={currentFriend}
                                message={message}
                                myInfo={myInfo}
                                typingMessage={typingMessage}
                            />
                            <MessageSend
                                imageSend={imageSend}
                                emojiSend={emojiSend}
                                inputHandle={inputHandle}
                                newMessage={newMessage}
                                sendMessage={sendMessage}
                            />
                        </div>
                    </div>
                    <div className="col-4">
                        <FriendInfo message={message} currentFriend={currentFriend} activeUser={activeUser} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RightSide;
