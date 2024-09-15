import { useParams } from 'react-router-dom';
import sendIcon from '../../assets/send.svg';
import { useEffect, useState } from 'react';

import './GroupChat.css';
import { url } from '../../assets/constants/constants';


function GroupChat() {
    const { groupId } = useParams();

    const [chat, setChat] = useState(undefined);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${url}chat/${groupId}`);
            const data = await response.json();
            setChat(data);
        };
        fetchData();
    }, []);

    const userId = "1";

    return (
        <>
            <div className="groupchat-container">
                {chat != undefined
                ? <>
                    <div className="groupchat-messages">
                        {
                            chat.map((msg, i) => {
                                if (msg.type == "chat") {
                                    let authorType = "other";
                                    let author = msg.content.author;
                                    if (msg.content.author_id === userId) { authorType = "own"; author = "You" }
                                    return (
                                        <div key={i} className={`groupchat-${authorType}`}>
                                            <h6>{author}</h6>
                                            <p>{msg.content.text}</p>
                                        </div>
                                    );
                                } else if (msg.type == "log") {
                                    return (
                                        <div key={i} className="groupchat-log">
                                            <p>{msg.content.text}</p>
                                        </div>
                                    )
                                } else if (msg.type == "poll") {
                                    let authorType = "other";
                                    let author = msg.content.author;
                                    if (msg.content.author_id === userId) { authorType = "own"; author = "You" }
                                    return (
                                        <div key={i} className={`groupchat-${authorType}`}>
                                            <h6>{author}</h6>
                                            <div className="groupchat-poll">
                                                <h1>Poll: {msg.content.poll.title}</h1>
                                                <div className="groupchat-poll-options">
                                                    {
                                                        msg.content.poll.options.map((option, j) => {
                                                            
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            })
                        }
                        <div className="groupchat-log">
                            <p>Skipper deposited $ 3,000</p>
                        </div>
                        <div className="groupchat-other">
                            <h6>Cabo</h6>
                            <p>What do you guys think if we go in first class?</p>
                        </div>
                        <div className="groupchat-own">
                            <h6>You</h6>
                            <p>That is a stupid idea Cabo 🤬</p>
                        </div>
                        <div className="groupchat-other">
                            <h6>Kowalski</h6>
                            <div className="groupchat-poll">
                                <h1>Poll: Should we buy first class tickets?</h1>
                                <div className="groupchat-poll-options">
                                    <div className="groupchat-poll-option">
                                        <div className="groupchat-poll-option-left">
                                            <button>Yes</button>
                                            <p className="groupchat-poll-cost">+ $ 54,000</p>
                                        </div>
                                        <p>2</p>
                                    </div>
                                    <div className="groupchat-poll-option groupchat-poll-option-selected">
                                        <div className="groupchat-poll-option-left">
                                            <button>No</button>
                                        </div>
                                        <p>3</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="groupchat-newmessage">
                        <button className="groupchat-createpoll-button">
                            Create Poll
                        </button>
                        <div className="groupchat-inputbar">
                            <input type="text" placeholder="Enter message..."/>
                            <button><img src={sendIcon} alt="" /></button>
                        </div>
                    </div>
                </>
                : <></>}
            </div>
        </>
    )
}

export default GroupChat;