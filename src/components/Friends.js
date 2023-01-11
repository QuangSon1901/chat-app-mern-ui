import moment from 'moment/moment';
import React from 'react';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { RiCheckboxCircleFill } from 'react-icons/ri';

const Friends = ({ friend, myId, activeUser }) => {
    return (
        <div className="friend">
            <div className="friend-image">
                <div className="image">
                    <img src={`http://localhost:5000/public/uploads/${friend.fndInfo.image}`} alt="" />
                    {activeUser && activeUser.length > 0 && activeUser.some((u) => u.userId === friend.fndInfo._id) ? (
                        <div className="active-icon"></div>
                    ) : (
                        ''
                    )}
                </div>
            </div>
            <div className="friend-name-seen">
                <div className="friend-name">
                    <h4
                        className={
                            friend.msgInfo?.senderId !== myId &&
                            friend.msgInfo?.status !== undefined &&
                            friend.msgInfo?.status !== 'seen fd_name'
                                ? 'unseen-message fd_name'
                                : 'fd_name'
                        }
                    >
                        {friend.fndInfo.userName}
                    </h4>
                    <div className="msg-time">
                        {friend.msgInfo && friend.msgInfo.senderId === myId ? <span>You: </span> : ''}

                        {friend.msgInfo && friend.msgInfo.message.text ? (
                            <span
                                className={
                                    friend.msgInfo?.senderId !== myId &&
                                    friend.msgInfo?.status !== undefined &&
                                    friend.msgInfo?.status !== 'seen'
                                        ? 'unseen-message'
                                        : ''
                                }
                            >
                                {friend.msgInfo.message.text.slice(0, 10)}
                            </span>
                        ) : friend.msgInfo && friend.msgInfo.message.image ? (
                            <span>Send a image</span>
                        ) : (
                            <span>{friend.fndInfo.userName}: connect you </span>
                        )}
                        <span>
                            &nbsp; &sdot; &nbsp;
                            {friend.msgInfo
                                ? moment(friend.msgInfo.createdAt).startOf('mini').fromNow()
                                : moment(friend.fndInfo.createdAt).startOf('mini').fromNow()}
                        </span>
                    </div>
                </div>
                {myId === friend.msgInfo?.senderId ? (
                    <div className="seen-unseen-icon">
                        {friend.msgInfo.status === 'seen' ? (
                            <img src={`http://localhost:5000/public/uploads/${friend.fndInfo.image}`} alt="" />
                        ) : friend.msgInfo.status === 'delivared' ? (
                            <div className="delivared">
                                <RiCheckboxCircleFill />
                            </div>
                        ) : (
                            <div className="unseen">
                                <HiOutlineCheckCircle />
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="seen-unseen-icon">
                        {friend.msgInfo?.status !== undefined && friend.msgInfo?.status !== 'seen' ? (
                            <div className="seen-icon"></div>
                        ) : (
                            ''
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Friends;
