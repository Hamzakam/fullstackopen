const mongoose = require("mongoose");
const http = require("http");
const app = require("./app");
const { MONGODB_URI, PORT } = require("./utils/config");

mongoose
    .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.log("Failed to connect to MongoDB", error);
    });

const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Connected on PORT ${PORT}`);
});
