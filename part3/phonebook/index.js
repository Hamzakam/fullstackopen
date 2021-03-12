require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const PORT = process.env.PORT;
const Person = require("./models/person");
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

app.get("/", (req, res) => {
    res.send("<h1>Hello</h1>");
});

app.get("/api/persons", (req, res) => {
    Person.find({})
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            console.log("Error sending request to Mongodb", error);
        });
});

app.get("/info", (req, res) => {
    Person.find({})
        .then((result) => {
            const message = `Phone book has info for ${
                result.length
            } people <br/>${new Date()}`;
            res.send(message);
        })
        .catch((error) => {
            console.log("Error sending request to Mongodb", error);
        });
});

app.get("/api/persons/:id", (req, res) => {
    const id = req.params.id;
    Person.findById(id)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => res.status(404).json({ Message: "Person not found" }));
});

app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter((person) => person.id !== id);
    res.status(204).end();
});

app.post("/api/persons/", (req, res) => {
    const { name, phoneNumber } = req.body;
    if (!name && !phoneNumber && name !== "" && phoneNumber !== "") {
        res.status(400).json({ error: "Invalid name or phoneNnumber" });
    } else {
        const person = new Person({ name, phoneNumber });
        person.save().then((result) => {
            res.status(200).json(person);
        });
    }
});

app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
});
