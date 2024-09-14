import { useParams} from 'react-router-dom';

function GroupCard() {
    const { groupId } = useParams();

    return (
        <>
            <div>
                group card {groupId}
            </div>
        </>
    )
}

export default GroupCard;