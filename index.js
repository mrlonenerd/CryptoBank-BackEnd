const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("./startup/logger");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./startup/routes")(app);
require("./startup/db")();

app.listen(process.env.PORT, () =>
  logger.info(`Listening on port ${process.env.PORT}...`)
);
