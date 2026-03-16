const express = require('express');
const fs = require('fs');

const router = express.Router();
const FILE = './data/workouts.json';

router.get("/", (req, res) => {
  const data = fs.readFileSync(FILE);
  const workouts = JSON.parse(data);

  const numberWorkout = workouts.length;

  const timeWorkout = workouts.reduce((sum, w) => {
    return sum + w.duration;
  }, 0);

  res.json({
    numberWorkout,
    timeWorkout,
    workouts
  });
});




router.post('/', (req, res) => {
  const workout = req.body;

  const data = fs.readFileSync(FILE, 'utf-8');
  const workouts = JSON.parse(data);

  workouts.push(workout);

  fs.writeFileSync(FILE, JSON.stringify(workouts, null, 2));
  res.json({ message: "Workout saved" });
});

module.exports = router;