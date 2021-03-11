const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const PORT = process.env.PORT || 3001;
morgan.token("body", function getBody(req) {
    return JSON.stringify(req.body);
});
const app = express();
app.use(express.static("build"));
app.use(express.json());
app.use(
    morgan(
        ":method :url :status :res[content-length] - :response-time ms :body"
    )
);
app.use(cors());
let persons = [
    {
        id: 1,
        name: "Artas Hellas",
        phoneNumber: "043-1333333",
    },
    {
        id: 2,
        name: "Ada Lovelace",
        phoneNumber: "043-1333333",
    },
    {
        id: 3,
        name: "Dan Abramov",
        phoneNumber: "043-1333333",
    },
    {
        id: 4,
        name: "Mary Poppendek",
        phoneNumber: "043-1333333",
    },
];

app.get("/", (req, res) => {
    res.send("<h1>Hello</h1>");
});

app.get("/api/persons", (req, res) => {
    res.json(persons);
});

app.get("/info", (req, res) => {
    const message = `Phone book has info for ${
        persons.length
    } people <br/>${new Date()}`;
    res.send(message);
});

app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find((person) => person.id === id);
    if (person) {
        res.json(person);
    } else {
        res.status(404).json({ error: "Person not found" });
    }
});

app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter((person) => person.id !== id);
    res.status(204).end();
});

const genRandomId = () => Math.floor(Math.random() * 10000);

app.post("/api/persons/", (req, res) => {
    const { name, phoneNumber } = req.body;
    const checkExist = persons.find((person) => person.name === name);
    if (checkExist) {
        res.status(409).json({ error: "User already exists" });
    } else if (!name && !phoneNumber) {
        res.status(400).json({ error: "Invalid name orphoneNnumber" });
    } else {
        const id = genRandomId();
        const person = { id, name, phoneNumber };
        persons = persons.concat(person);
        res.status(200).json(person);
    }
});

app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
});
