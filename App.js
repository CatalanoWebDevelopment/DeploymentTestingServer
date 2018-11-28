require("dotenv").config();
require("./db");

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const port = 3000;

const HelloWorld = require("./controllers/HelloWorldController");

app.use(bodyParser.json());
app.use(require("./middleware/headers"));
app.use("/hello_world", HelloWorld);

app.listen(port);
