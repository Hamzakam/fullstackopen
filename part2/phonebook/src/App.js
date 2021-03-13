import React, { useState, useEffect } from "react";
import Notification from "./Components/Notification";
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
    const [notificationMessage, setNotificationMessage] = useState(null);
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
                        setNotificationMessage({
                            message: `Updated ${res.name}'s number to ${res.phoneNumber}`,
                            type: "notification",
                        });
                        setTimeout(() => setNotificationMessage(null), 5000);
                    })
                    .catch((err) => {
                        setNotificationMessage({
                            message: err.response.data.error,
                            type: "error",
                        });
                        setTimeout(() => setNotificationMessage(null), 5000);
                    });
            }
        } else {
            const newPerson = { name: newName, phoneNumber: newPhoneNumber };
            personServices
                .createPerson(newPerson)
                .then((res) => {
                    setPersons(persons.concat(res));
                    setNotificationMessage({
                        message: `Added ${res.name} with number ${res.phoneNumber}`,
                        type: "notification",
                    });
                    setTimeout(() => setNotificationMessage(null), 5000);
                })
                .catch((err) => {
                    setNotificationMessage({
                        message: err.response.data.error,
                        type: "error",
                    });
                    setTimeout(() => setNotificationMessage(null), 5000);
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
    const handleNumberDelete = (deletePerson) => {
        if (window.confirm("Delete user?")) {
            personServices
                .deletePerson(deletePerson.id)
                .then(() => {
                    setPersons(
                        persons.filter(
                            (person) => person.id !== deletePerson.id
                        )
                    );
                })
                .catch((err) => {
                    setNotificationMessage({
                        message: `Information of ${deletePerson.name} has already been removed from the server.`,
                        type: "error",
                    });
                    setTimeout(() => setNotificationMessage(null), 5000);
                });
        }
    };
    return (
        <div>
            <h2>Phonebook</h2>
            <Filter handleFilterChange={handleFilterChange} />
            <Notification message={notificationMessage} />
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
