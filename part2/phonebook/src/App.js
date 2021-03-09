import React, { useState, useEffect } from "react";
import axios from "axios";
import PersonForm from "./Components/PersonForm";
import Persons from "./Components/Persons";
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
            alert(`${newName} is already added to phonebook`);
        } else {
            setPersons(
                persons.concat({ name: newName, phoneNumber: newPhoneNumber })
            );
            setNewName("");
            setNewPhoneNumber("");
        }
    };
    useEffect(() => {
        axios.get("http://127.0.0.1:3001/persons").then((res) => {
            console.log(res.data);
            setPersons(res.data);
        });
    }, []);
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
