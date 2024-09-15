import UpperNavbar from "../../components/upperNavbar/UpperNavbar";
import EventForm from "../../components/newEvent/EventForm";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./NewEvent.css";

function NewEvent() {
  return (
    <>
      <UpperNavbar text={"Create Event"} type={"none"} />
      <div className="screen">
        {/* <h1>Create Event</h1> */}
        <EventForm />
      </div>
    </>
  );
}

export default NewEvent;
