import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const searchResults =
    searchTerm === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().match(searchTerm.toLowerCase()),
        );

  const handleNameInput = (event) => setNewName(event.target.value);
  const handleNumberInput = (event) => setNewNumber(event.target.value);
  const handleSearchInput = (event) => setSearchTerm(event.target.value);

  const handleCreatePerson = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    persons.some((person) => person.name === newName)
      ? alert(`${newName} is already added to the phonebook`)
      : setPersons(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} handleSearchInput={handleSearchInput} />
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleCreatePerson={handleCreatePerson}
        handleNameInput={handleNameInput}
        handleNumberInput={handleNumberInput}
      />

      <h2>Numbers</h2>
      <Persons searchResults={searchResults} />
    </div>
  );
};

export default App;
