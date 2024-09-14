import { useParams} from 'react-router-dom';

function GroupChat() {
    const { groupId } = useParams();


    return (
        <>
            <div>
                group chat {groupId}
            </div>
        </>
    )
}

export default GroupChat;