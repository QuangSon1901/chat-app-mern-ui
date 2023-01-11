import React from 'react';
import { HiOutlineChevronDown } from 'react-icons/hi';

const FriendInfo = ({ message, currentFriend, activeUser }) => {
    return (
        <div className="friend-info">
            <input type="checkbox" id="gallery" />
            <div className="image-name">
                <div className="image">
                    <img src={`http://localhost:5000/public/uploads/${currentFriend.image}`} alt="" />
                </div>
                {activeUser && activeUser.length > 0 && activeUser.some((u) => u.userId === currentFriend._id) ? (
                    <div className="active-user">Active</div>
                ) : (
                    ''
                )}

                <div className="name">
                    <h4>{currentFriend.userName}</h4>
                </div>
            </div>
            <div className="others">
                <div className="custom-chat">
                    <h3>Customise Chat</h3>
                    <HiOutlineChevronDown />
                </div>
                <div className="privacy">
                    <h3>Privacy and Support</h3>
                    <HiOutlineChevronDown />
                </div>
                <label htmlFor="gallery">
                    <div className="media">
                        <h3>Share Media</h3>
                        <HiOutlineChevronDown />
                    </div>
                </label>
            </div>
            <div className="gallery">
                {message && message.length > 0
                    ? message.map(
                          (m, index) =>
                              m.message.image && (
                                  <img
                                      key={index}
                                      src={`http://localhost:5000/public/uploads/${m.message.image}`}
                                      alt=""
                                  />
                              ),
                      )
                    : ''}
            </div>
        </div>
    );
};

export default FriendInfo;
