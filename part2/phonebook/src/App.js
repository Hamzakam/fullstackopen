import React, { useState } from "react";
const Filter = ({ handleFilterChange }) => {
    return (
        <div>
            filter shown with
            <input onChange={handleFilterChange} />
        </div>
    );
};
const InputForm = ({ text, value, handleOnChange }) => {
    return (
        <div>
            {text}: <input value={value} onChange={handleOnChange} />
        </div>
    );
};
const PersonForm = ({
    handleOnSubmit,
    handleNameChange,
    handleNumberChange,
    newName,
    newPhoneNumber,
}) => {
    return (
        <form onSubmit={handleOnSubmit}>
            <InputForm
                text="name"
                value={newName}
                handleOnChange={handleNameChange}
            />
            <InputForm
                text="number"
                value={newPhoneNumber}
                handleOnChange={handleNumberChange}
            />
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    );
};
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
const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", phoneNumber: "043-123456" },
    ]);
    const [newName, setNewName] = useState("");
    const [newPhoneNumber, setNewPhoneNumber] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const handleOnSubmit = (event) => {
        event.preventDefault();
        if (persons.some((person) => person.name === newName)) {
            alert(`${newName} is already added to phonebook`);
        } else {
            setPersons(
                persons.concat({ name: newName, phoneNumber: newPhoneNumber })
            );
            setNewName("");
            setNewPhoneNumber("");
        }
    };
    const handleFilterChange = (e) => setSearchInput(e.target.value);
    const handleNameChange = (e) => setNewName(e.target.value);
    const handleNumberChange = (e) => setNewPhoneNumber(e.target.value);

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter handleFilterChange={handleFilterChange} />
            <h2>Add a new</h2>
            <PersonForm
                handleOnSubmit={handleOnSubmit}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
                newName={newName}
                newPhoneNumber={newPhoneNumber}
            />
            <h2>Numbers</h2>
            <Persons persons={persons} searchInput={searchInput} />
        </div>
    );
};

export default App;
