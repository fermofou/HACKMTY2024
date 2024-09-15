import { useState, useEffect } from 'react';
import { useParams, Link, Route, Routes, useLocation } from 'react-router-dom';
import axios from 'axios';
import UpperNavbar from "../../components/upperNavbar/UpperNavbar";
import GroupHome from '../groupHome/GroupHome';
import GroupChat from '../groupChat/GroupChat';
import GroupCard from '../groupCard/GroupCard';
import CardGrayIcon from '../../assets/cardGrayIcon.svg';
import ChatGrayIcon from '../../assets/chatGrayIcon.svg';
import HomeGrayIcon from '../../assets/homeGrayIcon.svg';
import "./Group.css";

function Group() {
    const { groupId } = useParams();
    const location = useLocation(); // Hook to get the current path

    const [eventDetail, setEventDetail] = useState([]);

    useEffect(() => {
        async function fetchEventDetails() {
            try {
                const response = await axios.get("http://localhost:3000/" + `event/${groupId}`);
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
                <UpperNavbar text={eventDetail.name} type={type} />
            </div>
            <Routes>
                <Route path="" element={<GroupHome />} />
                <Route path="groupHome" element={<GroupHome />} />
                <Route path="groupChat" element={<GroupChat />} />
                <Route path="groupCard" element={<GroupCard />} />
            </Routes>
            <nav className="bottom-nav">
                <Link to="groupChat" className={location.pathname.includes('groupChat') ? 'active' : ''}>
                    <img src={ChatGrayIcon} alt="Chat" />
                </Link>
                <Link to="groupHome" className={location.pathname.includes('groupHome') || location.pathname === `/group/${groupId}` ? 'active' : ''}>
                    <img src={HomeGrayIcon} alt="Home" />
                </Link>
                <Link to="groupCard" className={location.pathname.includes('groupCard') ? 'active' : ''}>
                    <img src={CardGrayIcon} alt="Card" />
                </Link>
            </nav>
        </>
    )
}

export default Group;
