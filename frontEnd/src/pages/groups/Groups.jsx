import { Link } from 'react-router-dom';
import EventCard from '../../components/groups/EventCard'
import CapitalOneLogo from '../../assets/CapitalOneLogo.png'
import PlusImg from '../../assets/createNewEventPlusImg.png'

import "./Groups.css"

function Groups() {
    const groupsSamples = [
        { groupId: 1 },
        { groupId: 2 },
        { groupId: 3 },
        { groupId: 4 },
        { groupId: 5 },
        { groupId: 6 }
    ];

    return (
        <>
            <div className='groups-container'>
                <div className='groups-capital-one-presentation-container'>
                    <img src={CapitalOneLogo} alt="capital one logo" />
                    <p>Your Events</p>
                </div>
                <div className='groups-create-new-event-container'>
                    <Link to="/newEvent">
                        <img src={PlusImg} alt="plussButton" />
                        Create new Event
                    </Link>
                </div>
                <div className='events-container'>
                        {groupsSamples.map((event, index) => (
                            <li key={`${event.groupId}-${index}`}>
                                <Link to={`/group/${event.groupId}`}>
                                    <EventCard number={(index % 5) + 1} />
                                </Link>
                            </li>
                        ))}
                </div>
            </div>
        </>
    )
}

export default Groups;
