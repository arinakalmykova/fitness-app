const express = require('express');
const cors = require('cors');
const fs = require('fs');

const workoutsRouter = require("./routes/workouts");

const app = express();

app.use(cors());
app.use(express.json());

app.use("./workouts", workoutsRouter);

app.listen(5000, console.log("Сервер запущен на 5000 порту"));