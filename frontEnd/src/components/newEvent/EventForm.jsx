import React, { useState } from "react";
import PeopleSelector from "./PeopleSelector";
import eventImg from "../../assets/eventImg.png";
import savingsImg from "../../assets/savingsImg.png";

const EventForm = () => {
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("");
  const [goal, setGoal] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedPeople, setSelectedPeople] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ eventName, eventType, goal, dueDate, selectedPeople });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name of the Event</label>
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
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
        <label>Monetary Goal</label>
        <input
          type="number"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
      </div>
      <div>
        <label>Due Date</label>
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
      <button type="submit">Create</button>
    </form>
  );
};

export default EventForm;
