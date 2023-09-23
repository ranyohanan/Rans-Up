const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const chalk = require("chalk");
const register = require("./routes/register");
const login = require("./routes/login");
const cards = require("./routes/cards");
const favs = require("./routes/favs");
const users = require("./routes/users");


const app = express();
const PORT = process.env.PORT || 8000;

const success = chalk.green;
const fail = chalk.red;
const actions = chalk.blue;

mongoose.connect(process.env.DB, { useNewUrlParser: true })
    .then(() => console.log(success("MongoDB connected")))
    .catch((err) => console.log(fail(err)));

app.use(morgan(actions('Date:[:date[clf]] req-method:[:method] url:[:url] res-status:[:status] res-time:[:response-time ms]')));
app.use(express.json());
app.use(cors());
app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/cards", cards);
app.use("/api/favs", favs);
app.use("/api/users", users);

app.listen(PORT, () => console.log(success("Server started on port", PORT)));