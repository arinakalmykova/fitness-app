import { useState, useEffect } from "react";
import { getWorkouts, deleteWorkoutService, createWorkoutService } from "../services/workoutService";
import type { Workout } from "../components/WorkoutCard";

export function useWorkouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    fetchWorkouts();
  }, [ ]);

  const fetchWorkouts = async () => {
    try {
      const data = await getWorkouts();
      setWorkouts(data.workouts || []);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteWorkout = async (id: number) => {
    try {
        const res = await deleteWorkoutService(id); 
        const data = await res;
        await fetchWorkouts(); 
        console.log(data);
    } catch (err) {
        console.log(err);
    }
    };

    const createWorkout = async (workout: any) => {
    try {
      await createWorkoutService(workout);
      await fetchWorkouts(); 
    } catch (err) {
      console.error("Ошибка при создании:", err);
    }
  };


  return { workouts, setWorkouts, deleteWorkout, createWorkout };
}