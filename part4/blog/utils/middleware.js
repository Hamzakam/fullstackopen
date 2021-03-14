const logger = require("./logger");

const responseLogger = (request, response, next) => {
    logger.info("METHOD:", request.method);
    logger.info("PATH:", request.path);
    logger.info("BODY:", request.body);
    next();
};

const unknownEndPoint = (request, response) => {
    response.status(404).json({ message: "Unknown Endpoint" });
};

const errorHandler = (error, request, response, next) => {
    console.error(error.message);
    if (error.name === "CastError") {
        return response.status(400).send({ error: "Malformed ID" });
    } else if (error.name === "ValidationError") {
        return response.status(400).send({ error: error.message });
    }
    next(error);
};

module.exports = { unknownEndPoint, errorHandler, responseLogger };
