import UpperNavbar from "../../components/upperNavbar/UpperNavbar";
import EventForm from "../../components/newEvent/EventForm";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import EventCard from "../../components/groups/EventCard";
import CapitalOneLogo from "../../assets/CapitalOneLogo.png";
import PlusImg from "../../assets/createNewEventPlusImg.png";

import "./NewEvent.css";

function NewEvent() {
  return (
    <>
      <UpperNavbar text={"Create Event"} type={"none"} />
      <div>
        {/* <h1>Create Event</h1> */}
        <EventForm />
      </div>
    </>
  );
}

export default NewEvent;
