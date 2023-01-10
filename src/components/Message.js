import moment from 'moment';
import React, { Fragment } from 'react';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { RiCheckboxCircleFill } from 'react-icons/ri';

const Message = ({ scrollRed, message, myInfo, currentFriend, typingMessage }) => {
    return (
        <>
            <div className="message-show">
                {message && message.length > 0 ? (
                    message.map((m, index) => (
                        <Fragment key={index}>
                            {m.senderId === myInfo.id ? (
                                <div ref={scrollRed} className="my-message">
                                    <div className="image-message">
                                        <div className="my-text">
                                            <p className="message-text">
                                                {m.message.text ? (
                                                    m.message.text
                                                ) : (
                                                    <img
                                                        src={`http://localhost:5000/public/uploads/${m.message.image}`}
                                                        alt=""
                                                    />
                                                )}
                                            </p>
                                            {index === message.length - 1 && m.senderId === myInfo.id ? (
                                                m.status === 'seen' ? (
                                                    <img
                                                        src={`http://localhost:5000/public/uploads/${currentFriend.image}`}
                                                        alt=""
                                                        className="img"
                                                    />
                                                ) : m.status === 'delivared' ? (
                                                    <span>
                                                        <RiCheckboxCircleFill />
                                                    </span>
                                                ) : (
                                                    <span>
                                                        <HiOutlineCheckCircle />
                                                    </span>
                                                )
                                            ) : (
                                                ''
                                            )}
                                        </div>
                                    </div>
                                    <div className="time">{moment(m.createdAt).startOf('mini').fromNow()}</div>
                                </div>
                            ) : (
                                <div ref={scrollRed} className="fd-message">
                                    <div className="image-message-time">
                                        <img
                                            src={`http://localhost:5000/public/uploads/${currentFriend.image}`}
                                            alt=""
                                        />
                                        <div className="message-time">
                                            <div className="fd-text">
                                                <p className="message-text">
                                                    {m.message.text ? (
                                                        m.message.text
                                                    ) : (
                                                        <img
                                                            src={`http://localhost:5000/public/uploads/${m.message.image}`}
                                                            alt=""
                                                        />
                                                    )}
                                                </p>
                                            </div>
                                            <div className="time">{moment(m.createdAt).startOf('mini').fromNow()}</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Fragment>
                    ))
                ) : (
                    <div className="friend-connect">
                        <img src={`http://localhost:5000/public/uploads/${currentFriend.image}`} alt="" />
                        <h3>{currentFriend.userName} connect you</h3>
                        <span>{moment(currentFriend.createdAt).startOf('mini').fromNow()}</span>
                    </div>
                )}
            </div>
            {typingMessage && typingMessage.msg && typingMessage.senderId === currentFriend._id ? (
                <div className="typing-message">
                    <div ref={scrollRed} className="fd-message">
                        <div className="image-message-time">
                            <img src={`http://localhost:5000/public/uploads/${currentFriend.image}`} alt="" />
                            <div className="message-time">
                                <div className="fd-text">
                                    <p className="message-text">Typing message....</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                ''
            )}
        </>
    );
};

export default Message;
