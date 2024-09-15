import { useParams} from 'react-router-dom';
import ContributionCard from '../../components/groups/ContributionCard'; 

import "./GroupHome.css"

function GroupHome() {
    const { groupId } = useParams();

    return (
        <>
            <div>
                group home {groupId}
            </div>
            <ContributionCard/>
        </>
    )
}

export default GroupHome;