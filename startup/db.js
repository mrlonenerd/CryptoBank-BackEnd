const logger = require("./logger");
const mongoose = require("mongoose");
require("dotenv").config();

module.exports = function () {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.MONGO_URL, { useNewUrlParser: true })
    .then(() => logger.info(`DB Connection Established...`))
    .catch((error) =>
      logger.error(`Not Connected to ${db} ${JSON.stringify(error)}...`)
    );
};
