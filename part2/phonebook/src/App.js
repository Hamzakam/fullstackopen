import React, { useState, useEffect } from "react";
import PersonForm from "./Components/PersonForm";
import Persons from "./Components/Persons";
import personServices from "./services";
const Filter = ({ handleFilterChange }) => {
    return (
        <div>
            filter shown with
            <input onChange={handleFilterChange} />
        </div>
    );
};

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newPhoneNumber, setNewPhoneNumber] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const handleOnSubmit = (event) => {
        event.preventDefault();
        if (persons.some((person) => person.name === newName)) {
            if (
                window.confirm(
                    `${newName} is already added to phonebook,replace old number with new?`
                )
            ) {
                const toUpdatePerson = persons.find(
                    (person) => person.name === newName
                );
                personServices
                    .updatePerson(toUpdatePerson, newPhoneNumber)
                    .then((res) => {
                        setPersons(
                            persons.map((person) => {
                                return person !== toUpdatePerson ? person : res;
                            })
                        );
                    });
            }
        } else {
            const newPerson = { name: newName, phoneNumber: newPhoneNumber };
            personServices.createPerson(newPerson).then((res) => {
                setPersons(persons.concat(res));
            });
            setNewName("");
            setNewPhoneNumber("");
        }
    };
    useEffect(() => {
        personServices.getAll().then((res) => {
            setPersons(res);
        });
    }, []);
    const handleFilterChange = (e) => setSearchInput(e.target.value);
    const handleNameChange = (e) => setNewName(e.target.value);
    const handleNumberChange = (e) => setNewPhoneNumber(e.target.value);
    const handleNumberDelete = (id) => {
        if (window.confirm("Delete user?")) {
            personServices.deletePerson(id).then(() => {
                setPersons(persons.filter((person) => person.id !== id));
            });
        }
    };
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
            <Persons
                persons={persons}
                searchInput={searchInput}
                handleDelete={handleNumberDelete}
            />
        </div>
    );
};

export default App;
