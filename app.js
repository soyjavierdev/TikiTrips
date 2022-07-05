require("dotenv/config");

require("./db");

const express = require("express");

const app = express();

require('./config/session.config')(app)
require("./config")(app);

const projectName = "blabla";
app.locals.appTitle = `${projectName}`;

const index = require("./routes/index.routes");
app.use("/", index);

require("./error-handling")(app);

module.exports = app;
