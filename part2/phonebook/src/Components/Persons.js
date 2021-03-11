const Person = ({ person, handleDelete }) => {
    return (
        <div>
            <p>
                {person.name} {person.phoneNumber}
            </p>
            <button onClick={() => handleDelete(person)}>delete</button>
        </div>
    );
};
const Persons = ({ persons, searchInput, handleDelete }) => {
    return persons
        .filter(
            (person) =>
                searchInput === "" ||
                person.name.toLowerCase().includes(searchInput.toLowerCase())
        )
        .map((person) => (
            <Person
                key={person.id}
                person={person}
                handleDelete={handleDelete}
            />
        ));
};
export default Persons;
