import PersonService from "../services/PersonService";

const Persons = ({ searchTerm, persons, setPersons }) => {
  const searchResults =
    searchTerm === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().match(searchTerm.toLowerCase()),
        );

  const remove = (id, name) => {
    if (confirm(`Delete ${name} ?`)) {
      PersonService.remove(id).then(() =>
        setPersons(persons.filter((person) => person.id !== id)),
      );
    }
  };
  return (
    <>
      {searchResults.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}{" "}
          <button onClick={() => remove(person.id, person.name)}>delete</button>
        </p>
      ))}
    </>
  );
};
export default Persons;
