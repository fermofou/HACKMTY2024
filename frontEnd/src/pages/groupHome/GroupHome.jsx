import { useParams} from 'react-router-dom';

function GroupHome() {
    const { groupId } = useParams();

    return (
        <>
            <div>
                group home {groupId}
            </div>
        </>
    )
}

export default GroupHome;