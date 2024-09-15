import React, { useState, useEffect } from "react";
import "./PeopleSelector.css"; // Import your CSS file

const PeopleSelector = ({ selectedPeople, setSelectedPeople }) => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await fetch("http://localhost:3000/clients");
        const data = await response.json();
        const names = data.map(
          (user) => `${user.first_name} ${user.last_name}`
        );
        setPeople(names);
      } catch (error) {
        console.error("Error fetching people:", error);
      }
    };

    fetchPeople();
  }, []);

  const togglePerson = (person) => {
    setSelectedPeople((prev) =>
      prev.includes(person)
        ? prev.filter((p) => p !== person)
        : [...prev, person]
    );
  };

  const getInitial = (name) => {
    return name.charAt(0); // Get the first letter of the person's first name
  };

  return (
    <div>
      <label className="inputLabel">People</label>
      {people.map((person) => (
        <div className="list-item" key={person}>
          <label className="custom-checkbox">
            <input
              type="checkbox"
              checked={selectedPeople.includes(person)}
              onChange={() => togglePerson(person)}
            />
            <span className="checkbox-circle">{getInitial(person)}</span>
            <span className="name">{person}</span>
            <span className="checkmark">✔</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default PeopleSelector;