const express = require('express');
const fs = require('fs');

const router = express.Router();

const FILE = './data/workouts.json';

app.get('/', (req,res)=> {
    const data = fs.readSyncFile(FILE);
    res.json(JSON.parse(data));
});

app.post('/', (req,res)=> {
    const workout = req.body;

    const data = fs.readSyncFile(FILE);
    const workouts = JSON.parse(data);

    workouts.push(workout);
    fs.writeSyncFile(FILE, JSON.stringify(workouts, null, 2))
    res.json({ message: "Workout saved"});
});


module.exports = router;