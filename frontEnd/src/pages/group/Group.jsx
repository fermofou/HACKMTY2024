import { useState, useEffect} from 'react';
import { useParams, Link, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import UpperNavbar from "../../components/upperNavbar/UpperNavbar";
import GroupHome from '../groupHome/GroupHome';
import GroupChat from '../groupChat/GroupChat';
import GroupCard from '../groupCard/GroupCard';

function Group() {
    const { groupId } = useParams();

    const [eventDetail, setEventDetail] = useState([]);

    useEffect(() => {
        async function fetchEventDetails() {
            try {
                const response = await axios.get("http://localhost:3000/" + `event/${groupId}`)
                setEventDetail(response.data);

            } catch (error) {
                console.log("Error fetching event" + error);
            }
        }

        fetchEventDetails();
    }, []);

    let type = "event";

    if (eventDetail.savings) {
        type = "savings";
    }

    return (
        <>
            <div>
                <UpperNavbar text={eventDetail.name} type={type}/>
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