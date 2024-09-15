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
                                    let selected = -1;
                                    for (let vote of msg.content.poll.voted) {
                                        if (vote.user === userId) {
                                            selected = vote.option;
                                            break;
                                        }
                                    }
                                    return (
                                        <div key={i} className={`groupchat-${authorType}`}>
                                            <h6>{author}</h6>
                                            <div className="groupchat-poll">
                                                <h1>Poll: {msg.content.poll.title}</h1>
                                                <div className="groupchat-poll-options">
                                                    {
                                                        msg.content.poll.options.map((option, j) => {
                                                            return (
                                                                <div key={j} className={`groupchat-poll-option ${selected == j ? 'groupchat-poll-option-selected' : ''}`}>
                                                                    <div className="groupchat-poll-option-left">
                                                                        <button>{option.name}</button>
                                                                        {option.cost > 0 && <p className="groupchat-poll-cost">+ $ {Intl.NumberFormat().format(option.cost)}</p>}
                                                                        {option.cost < 0 && <p className="groupchat-poll-cost">- $ {Intl.NumberFormat().format(Math.abs(option.cost))}</p>}
                                                                    </div>
                                                                    <p>{option.count}</p>
                                                                </div>
                                                            );
                                                        })
                                                    }
                                                </div>
                                                {msg.content.poll.done && <p className="groupchat-pollover">Poll is over{msg.content.poll.winner == -1 ? ' (Tied)' : ''}</p>}
                                            </div>
                                        </div>
                                    )
                                }
                            })
                        }
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