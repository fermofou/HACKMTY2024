// import { useParams} from 'react-router-dom';

import './GroupChat.css';

function GroupChat() {
    // const { groupId } = useParams();

    return (
        <>
            <div className="groupchat-container">
                <div className="groupchat-log">
                    <p>Skipper deposited $ 3,000</p>
                </div>
                <div className="groupchat-othermessage">
                    <h6>Cabo</h6>
                    <p>What do you guys think if we go in first class?</p>
                </div>
                <div className="groupchat-ownmessage">
                    <p>That is a stupid idea Cabo 🤬</p>
                </div>
            </div>
        </>
    )
}

export default GroupChat;