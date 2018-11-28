require("dotenv").config();
require("./db");

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const HelloWorld = require("./controllers/HelloWorldController");

app.use(bodyParser.json());
app.use(require("./middleware/headers"));
app.use("/hello_world", HelloWorld);

app.listen(process.env.PORT);
