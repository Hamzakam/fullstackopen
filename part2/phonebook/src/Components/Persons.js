const Person = ({ name, phoneNumber }) => {
    return (
        <p>
            {name} {phoneNumber}
        </p>
    );
};
const Persons = ({ persons, searchInput }) => {
    return persons
        .filter(
            (person) =>
                searchInput === "" ||
                person.name.toLowerCase().includes(searchInput.toLowerCase())
        )
        .map(({ name, phoneNumber }) => (
            <Person key={name} name={name} phoneNumber={phoneNumber} />
        ));
};
export default Persons;
