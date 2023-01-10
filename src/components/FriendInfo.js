import React from 'react';
import { HiOutlineChevronDown } from 'react-icons/hi';

const FriendInfo = ({ currentFriend, activeUser }) => {
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
                <img src="/mypicture.jpg" alt="" />
                <img src="/mypicture.jpg" alt="" />
                <img src="/mypicture.jpg" alt="" />
                <img src="/mypicture.jpg" alt="" />
                <img src="/mypicture.jpg" alt="" />
                <img src="/mypicture.jpg" alt="" />
                <img src="/mypicture.jpg" alt="" />
                <img src="/mypicture.jpg" alt="" />
                <img src="/mypicture.jpg" alt="" />
            </div>
        </div>
    );
};

export default FriendInfo;
