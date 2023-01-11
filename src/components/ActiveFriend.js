import React from 'react';

const ActiveFriend = ({ activeUser, setCurrentFriend }) => {
    return (
        <div className="active-friend">
            <div className="image-active-icon">
                {activeUser.map((u, index) => (
                    <div
                        key={index}
                        className="image"
                        onClick={() =>
                            setCurrentFriend({
                                _id: u.userInfo.id,
                                email: u.userInfo.email,
                                image: u.userInfo.image,
                                userName: u.userInfo.userName,
                            })
                        }
                    >
                        <img src={u.userInfo.image} alt="" />
                        <div className="active-icon"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActiveFriend;
