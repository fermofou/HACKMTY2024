import React, { useState, useEffect } from "react";
import "./PeopleSelector.css"; // Import your CSS file

const API_BASE = "http://localhost:3000"; // Replace with your actual API base URL

const PeopleSelector = ({ selectedPeople, setSelectedPeople }) => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await fetch(`${API_BASE}/clients`);
        const data = await response.json();

        const peopleWithAccounts = await Promise.all(
          data.map(async (user) => {
            return {
              _id: user._id,
              name: `${user.first_name} ${user.last_name}`,
              first_name: user.first_name,
              last_name: user.last_name,
            };
          })
        );

        setPeople(peopleWithAccounts);
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

  const getInitial = (person) => {
    return person.first_name.charAt(0) + person.last_name.charAt(0);
  };

  return (
    <div>
      <label className="inputLabel">People</label>
      {people.map((person) => (
        <div className="list-item" key={person._id}>
          <label className="custom-checkbox">
            <input
              type="checkbox"
              checked={selectedPeople.includes(person)}
              onChange={() => togglePerson(person)}
            />
            <span className="checkbox-circle">{getInitial(person)}</span>
            <span className="name">{person.name}</span>
            <span className="checkmark">✔</span>
          </label>
          {person.account_id && <span>Account ID: {person._id}</span>}
        </div>
      ))}
    </div>
  );
};

export default PeopleSelector;
