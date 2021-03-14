const http = require("http");
const app = require("./app");
const { PORT } = require("./utils/config");
const logger = require("./utils/logger");

//Start an http server via express app at PORT.
const server = http.createServer(app);
server.listen(PORT, () => {
    logger.info(`Connected on PORT ${PORT}`);
});
