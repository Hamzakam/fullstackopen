import React, { useState } from "react";

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
    return (
        <div>
            <h2>Phonebook</h2>
            <div>
                filter shown with
                <input onChange={(e) => setSearchInput(e.target.value)} />
            </div>
            <h2>Add a new</h2>
            <form onSubmit={handleOnSubmit}>
                <div>
                    name:{" "}
                    <input
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                </div>
                <div>
                    number:{" "}
                    <input
                        value={newPhoneNumber}
                        onChange={(e) => setNewPhoneNumber(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map((person) => {
                if (
                    person.name
                        .toLowerCase()
                        .includes(searchInput.toLowerCase()) ||
                    searchInput == ""
                ) {
                    return (
                        <p key={person.name}>
                            {person.name} {person.phoneNumber}
                        </p>
                    );
                }
            })}
        </div>
    );
};

export default App;
