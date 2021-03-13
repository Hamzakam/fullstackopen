require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const PORT = process.env.PORT;
const Person = require("./models/person");
const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" });
    } else if (error.name === "ValidationError") {
        return response.status(400).send({ error: error.message });
    }
    next(error);
};

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

app.get("/api/persons/:id", (req, res, next) => {
    const id = req.params.id;
    Person.findById(id)
        .then((result) => {
            if (result) {
                res.json(result);
            } else {
                res.status(404).end();
            }
        })
        .catch((err) => next(err));
});

app.post("/api/persons/", (req, res, next) => {
    const { name, phoneNumber } = req.body;
    const person = new Person({ name, phoneNumber });
    person
        .save()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => next(err));
});

app.delete("/api/persons/:id", (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.status(204).end();
        })
        .catch((err) => {
            next(err);
        });
});

app.put("/api/persons/:id", (req, res, next) => {
    Person.findByIdAndUpdate(
        req.params.id,
        { phoneNumber: req.body.phoneNumber },
        {
            new: true,
            runValidators: true,
        }
    )
        .then((result) => res.json(result))
        .catch((err) => next(err));
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
};

// handler of requests with unknown endpoint
app.use(unknownEndpoint);
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
});
