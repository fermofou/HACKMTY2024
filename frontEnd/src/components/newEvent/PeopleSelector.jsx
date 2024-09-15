import React, { useState, useEffect } from "react";

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

  return (
    <div>
      <label className="inputLabel">People</label>
      {people.map((person) => (
        <div key={person}>
          <input
            type="checkbox"
            checked={selectedPeople.includes(person)}
            onChange={() => togglePerson(person)}
          />
          {person}
        </div>
      ))}
    </div>
  );
};

export default PeopleSelector;
