import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ContributionCard from "../../components/groupHome/ContributionCard";
import GroupHomeEventCard from "../../components/groupHome/GroupHomeEventCard";
import ParticipantCard from "../../components/groupHome/ParticipantCard";
import { url } from "../../assets/constants/constants";

import "./GroupHome.css";

function GroupHome() {
  const { groupId } = useParams();
  const [eventDetail, setEventDetail] = useState(null);
  const userId = localStorage.getItem("selectedUserId");

  async function fetchEventDetails() {
    try {
      const response = await axios.get(url + `event/${groupId}`);
      setEventDetail(response.data);
    } catch (error) {
      console.log("Error fetching event" + error);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      fetchEventDetails();
    }, 1000);
    fetchEventDetails();

    return () => clearInterval(interval);
  }, []);

  console.log(eventDetail);

  return (
    <>
      {eventDetail ? (
        <div className="group-home-container">
          <GroupHomeEventCard event={eventDetail}></GroupHomeEventCard>
          <ContributionCard
            event={eventDetail}
            event_id={groupId}
            account_id={userId}
          />
          <div className="group-home-participant-container">
            {eventDetail.participants.map((participant, index) => (
              <ParticipantCard
                key={index}
                participant={participant}
                goal={eventDetail.goal}
              />
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default GroupHome;
