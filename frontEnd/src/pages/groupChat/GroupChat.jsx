// import { useParams} from 'react-router-dom';

import './GroupChat.css';

function GroupChat() {
    // const { groupId } = useParams();

    return (
        <>
            <div className="groupchat-container">
                <div className="groupchat-messages">
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
                            <h1>Should we buy first class tickets?</h1>
                            <div className="groupchat-poll-options">
                                <button className="groupchat-poll-option">Yes</button>
                                <button className="groupchat-poll-option groupchat-poll-option-selected">No</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="groupchat-newmessage">Hello</div>
            </div>
        </>
    )
}

export default GroupChat;