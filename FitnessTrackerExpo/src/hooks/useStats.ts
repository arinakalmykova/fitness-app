
import { useState, useEffect } from "react";
import { getWorkouts } from "../services/workoutService";

export type Stats ={
    numberWorkout:number | null,
    timeWorkout:number | null
}


export function useStats() {
  const [stats, setStats] = useState({ numberWorkout: null, timeWorkout: null });

  useEffect(() => {
    getWorkouts().then((workouts) => {
      const numberWorkout = workouts.numberWorkout;
      const timeWorkout = workouts.timeWorkout;
      setStats({ numberWorkout, timeWorkout });
    });
  }, []);

  return stats;
}