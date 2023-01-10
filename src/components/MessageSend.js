import React from 'react';
import { BsPlusCircle } from 'react-icons/bs';
import { RiGalleryLine } from 'react-icons/ri';
import { BiMessageAltEdit } from 'react-icons/bi';
import { AiFillGift, AiOutlineSend } from 'react-icons/ai';

const MessageSend = ({ imageSend, newMessage, emojiSend, inputHandle, sendMessage }) => {
    const emojis = [
        '🙂',
        '🤣',
        '😂',
        '😁',
        '😎',
        '😊',
        '😍',
        '😒',
        '👌',
        '😘',
        '❤',
        '👍',
        '🙌',
        '🤞',
        '✌',
        '😉',
        '😢',
        '😜',
        '👏',
        '💋',
        '🌹',
        '🤦‍♀️',
        '🤦‍♂️',
        '🤷‍♀️',
    ];
    return (
        <div className="message-send-section">
            <input type="checkbox" id="emoji" />
            <div className="file hover-attachment">
                <div className="add-attachment">Add attachment</div>
                <BsPlusCircle />
            </div>
            <div className="file hover-image">
                <div className="add-image">Add image</div>
                <input type="file" onChange={imageSend} id="pic" className="form-control" />
                <label htmlFor="pic">
                    <RiGalleryLine />
                </label>
            </div>
            <div className="file">
                <BiMessageAltEdit />
            </div>
            <div className="file hover-gift">
                <div className="add-gift">Add gift</div>
                <AiFillGift />
            </div>
            <div className="message-type">
                <input
                    type="text"
                    value={newMessage}
                    onChange={inputHandle}
                    onKeyDown={(event) => event.key === 'Enter' && sendMessage(event)}
                    name="message"
                    id="message"
                    placeholder="Aa"
                    className="form-control"
                />
                <label htmlFor="emoji">🙂</label>
            </div>
            <div className="file" onClick={sendMessage}>
                {newMessage ? <AiOutlineSend /> : '💖'}
            </div>
            <div className="emoji-section">
                <div className="emoji">
                    {emojis.map((e, index) => (
                        <span key={index} onClick={() => emojiSend(e)}>
                            {e}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MessageSend;
