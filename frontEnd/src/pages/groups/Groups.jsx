import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import EventCard from "../../components/groups/EventCard";
import CapitalOneLogo from "../../assets/CapitalOneLogo.png";
import PlusImg from "../../assets/createNewEventPlusImg.png";
import { url } from "../../assets/constants/constants";

import "./Groups.css";

function Groups() {
  const userId = localStorage.getItem("selectedUserId");
  console.log(userId);

  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fecthEvents() {
      try {
        const response = await axios.get(
          url + `events_savings?account_id=${userId}`
        );
        setEvents(await response.data);
      } catch (error) {
        console.log("Error fecthing evetns: " + error);
      }
    }

    fecthEvents();
  }, []);

  console.log(events);

  return (
    <>
      <div className="groups-container">
        <div className="groups-capital-one-presentation-container">
          <img src={CapitalOneLogo} alt="capital one logo" />
          <p>Your Events</p>
        </div>
        <div className="groups-create-new-event-container">
          <Link to="/newEvent">
            <img src={PlusImg} alt="plussButton" />
            Create new Event
          </Link>
        </div>
        <div className="events-container">
          {events.map((event, index) => (
            <li key={`${event._id}-${index}`}>
              <Link to={`/group/${event._id}`}>
                <EventCard number={(index % 5) + 1} event={event} />
              </Link>
            </li>
          ))}
        </div>
      </div>
    </>
  );
}

export default Groups;
