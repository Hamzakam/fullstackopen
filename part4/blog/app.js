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

app.use(cors());
app.use(express.json());
app.use(responseLogger);

app.use("/api/blogs", blogRouter);

app.use(errorHandler);
app.use(unknownEndPoint);
module.exports = app;
