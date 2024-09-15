import React, { useState } from "react";
import PeopleSelector from "./PeopleSelector";
import eventImg from "../../assets/eventImg.png";
import savingsImg from "../../assets/savingsImg.png";
import { Link, useNavigate } from "react-router-dom";
import { url } from "../../assets/constants/constants";
import axios from "axios";

const EventForm = () => {
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("");
  const [goal, setGoal] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedPeople, setSelectedPeople] = useState([]);

  const navigate = useNavigate();

  const handleCancelBtm = () => {
    navigate("/groups");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const percentage = 1 / selectedPeople.length;

    if (
      !eventName ||
      !eventType ||
      !goal ||
      !dueDate ||
      selectedPeople.length === 0
    ) {
      return;
    }
    // console.log({ eventName, eventType, goal, dueDate, selectedPeople });
    const parts = selectedPeople.map((person) => ({
      account_id: person._id,
      first_name: person.first_name,
      last_name: person.last_name,
      contribution: 0,
      percentage: percentage,
    }));

    const eventData = {
      name: eventName,
      goal: parseFloat(goal),
      deadline: dueDate,
      participants: parts,
    };
    console.log(eventData);

    if (eventType === "savings") {
      try {
        const response = await fetch(`${url}savings`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventData),
        });
        // console.log(JSON.stringify(eventData));
        // console.log(response);
        if (response.ok) {
          const data = await response.json();
          // alert(data.message);
          navigate("/groups"); // Navigate to a success page or another route
        } else {
          const errorData = await response.json();
          // alert(errorData.message);
        }
      } catch (error) {
        console.error("Error:", error);
        // alert("Something went wrong, please try again later.");
      }
    } else {
      try {
        const response = await fetch(`${url}event`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventData),
        });
        // console.log(JSON.stringify(eventData));
        // console.log(response);
        if (response.ok) {
          const data = await response.json();
          // alert(data.message);
          navigate("/groups"); // Navigate to a success page or another route
        } else {
          const errorData = await response.json();
          // alert(errorData.message);
        }
      } catch (error) {
        console.error("Error:", error);
        // alert("Something went wrong, please try again later.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div className="upperButtons">
          <button onClick={handleCancelBtm}>Cancel</button>

          <button type="submit" className="submitBtn">
            Create
          </button>
        </div>

        <div className="name-container">
          <label className="inputLabel">Name </label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="Name of the Event"
          />
        </div>
      </div>
      <div className="button-container">
        <button
          type="button"
          className={`event-button ${eventType === "party" ? "selected" : ""}`}
          onClick={() => setEventType("party")}
        >
          <img src={eventImg} alt="Party" />
        </button>
        <button
          type="button"
          className={`event-button ${
            eventType === "savings" ? "selected" : ""
          }`}
          onClick={() => setEventType("savings")}
        >
          <img src={savingsImg} alt="Savings" />
        </button>
      </div>
      <div className="name-container">
        <label className="inputLabel">Goal</label>
        <input
          type="number"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="Monetary Goal"
        />
      </div>
      <div className="name-container">
        <label className="inputLabel">Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <div className="name-container">
        <PeopleSelector
          selectedPeople={selectedPeople}
          setSelectedPeople={setSelectedPeople}
        />
      </div>
    </form>
  );
};

export default EventForm;
