import { useParams, Link, Route, Routes } from 'react-router-dom';
import GroupHome from '../groupHome/GroupHome';
import GroupChat from '../groupChat/GroupChat';
import GroupCard from '../groupCard/GroupCard';

function Group() {
    const { groupId } = useParams();

    return (
        <>
            <div>
                <Link to="/groups">go back</Link>
            </div>
            <Routes>
                <Route path="" element={<GroupHome />} />
                <Route path="groupHome" element={<GroupHome />} />
                <Route path="groupChat" element={<GroupChat />} />
                <Route path="groupCard" element={<GroupCard />} />
            </Routes>
            <nav>
                <Link to="groupHome">Home</Link>
                <Link to="groupChat">Chat</Link>
                <Link to="groupCard">Tarjeta</Link>
            </nav>
        </>
    )
}

export default Group;