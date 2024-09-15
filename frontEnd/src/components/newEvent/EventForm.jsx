import React, { useState } from "react";
import PeopleSelector from "./PeopleSelector";
import eventImg from "../../assets/eventImg.png";
import savingsImg from "../../assets/savingsImg.png";
import { Link, useNavigate } from "react-router-dom";

const EventForm = () => {
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("");
  const [goal, setGoal] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedPeople, setSelectedPeople] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !eventName ||
      !eventType ||
      !goal ||
      !dueDate ||
      selectedPeople.length === 0
    ) {
      return;
    }
    console.log({ eventName, eventType, goal, dueDate, selectedPeople });
    navigate("/groups");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div className="upperButtons">
          <Link to="/groups">
            <button>Cancel</button>
          </Link>

          <button type="submit" className="submitBtn">
            Create
          </button>
        </div>

        <label className="inputLabel">Name </label>
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="Name of the Event"
        />
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
      <div>
        <label className="inputLabel">Goal</label>
        <input
          type="number"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="Monetary Goal"
        />
      </div>
      <div>
        <label className="inputLabel">Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <PeopleSelector
        selectedPeople={selectedPeople}
        setSelectedPeople={setSelectedPeople}
      />
    </form>
  );
};

export default EventForm;
