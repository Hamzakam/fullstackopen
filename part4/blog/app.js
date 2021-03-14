const express = require("express");
const app = express();
const blogRouter = require("./controllers/blog");
const cors = require("cors");
const {
    errorHandler,
    unknownEndPoint,
    responseLogger,
} = require("./utils/middleware");
const mongoose = require("mongoose");
const { MONGODB_URI } = require("./utils/config");
const logger = require("./utils/logger");

//Connecting nodejs to mongodb.
mongoose
    .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then(() => {
        logger.info("Connected to MongoDB");
    })
    .catch((error) => {
        logger.error("Failed to connect to MongoDB", error);
    });

//Using cors middleware to allow cors requests
app.use(cors());

//Using express.json to allow parsing of json into js objects
app.use(express.json());

//Logs method,path and body of request
app.use(responseLogger);

//Adding blogRouter to app
app.use("/api/blogs", blogRouter);

//Handles errors and logs them.
app.use(errorHandler);

//Responds with 404 if wrong endpoint is used.
app.use(unknownEndPoint);

module.exports = app;
