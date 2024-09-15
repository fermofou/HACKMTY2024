import React from "react";

const PeopleSelector = ({ selectedPeople, setSelectedPeople }) => {
  const people = ["Gabriel Galván", "Julen", "Another Person"]; // Example list of people

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
