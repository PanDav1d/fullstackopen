import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import PersonService from "./services/PersonService";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    PersonService.getAll().then((response) => setPersons(response));
  }, []);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleNameInput = (event) => setNewName(event.target.value);
  const handleNumberInput = (event) => setNewNumber(event.target.value);
  const handleSearchInput = (event) => setSearchTerm(event.target.value);

  const handleCreatePerson = (event) => {
    event.preventDefault();
    const newPerson = {
      id: String(persons.length + 1),
      name: newName,
      number: newNumber,
    };
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
    }
    PersonService.create(newPerson).then((response) => {
      setPersons(persons.concat(response));
    });
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
      <Persons
        searchTerm={searchTerm}
        persons={persons}
        setPersons={setPersons}
      />
    </div>
  );
};

export default App;
