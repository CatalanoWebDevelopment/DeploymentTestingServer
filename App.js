require("dotenv").config();
require("./db");

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const HelloWorld = require("./controllers/HelloWorldController");
const User = require("./controllers/UserController");

app.use(bodyParser.json());
app.use(require("./middleware/headers"));
app.use("/hello_world", HelloWorld);
app.use(require("./middleware/validate-session"));
app.use("/user", User);

require("./associations");

app.listen(process.env.PORT);
