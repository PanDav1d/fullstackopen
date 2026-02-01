import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import PersonService from "./services/PersonService";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    PersonService.getAll().then((response) => setPersons(response));
  }, []);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [notificationMessage, setNotificationMessage] = useState({
    message: null,
    type: null,
  });

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

    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      confirm(
        `${newName} is already added to the phonebook, replace the old number with the new one?`,
      )
        ? PersonService.update(existingPerson, newNumber).then(
            (returnedPerson) => {
              setPersons(
                persons.map((person) =>
                  existingPerson.id === person.id ? returnedPerson : person,
                ),
              );
              setNotificationMessage({
                message: `updated ${existingPerson.name}`,
                type: "successful",
              });
              setTimeout(
                () => setNotificationMessage({ message: null, type: null }),
                3000,
              );
            },
          )
        : console.log("not updated");
    } else {
      PersonService.create(newPerson).then((response) => {
        setPersons(persons.concat(response));
        setNotificationMessage({
          message: `Added ${newPerson.name}`,
          type: "successful",
        });
        setTimeout(
          () => setNotificationMessage({ message: null, type: null }),
          3000,
        );
      });
    }
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h1>Phonebook</h1>

      <Notification
        message={notificationMessage.message}
        type={notificationMessage.type}
      />

      <Filter searchTerm={searchTerm} handleSearchInput={handleSearchInput} />
      <h1>add a new</h1>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleCreatePerson={handleCreatePerson}
        handleNameInput={handleNameInput}
        handleNumberInput={handleNumberInput}
      />

      <h1>Numbers</h1>
      <Persons
        searchTerm={searchTerm}
        persons={persons}
        setPersons={setPersons}
        setNotificationMessage={setNotificationMessage}
      />
    </div>
  );
};

export default App;
