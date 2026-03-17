import { createContext, useState, ReactNode } from "react";
import { useWorkouts } from "../hooks/useWorkouts";
import {useContext} from 'react';

type WorkoutContextProps = {
  workouts: any[];
  deleteWorkout: (id: number) => void;
};

const WorkoutContext = createContext<WorkoutContextProps | null>(null);

type ProviderProps = {
  children: ReactNode;
};

export function WorkoutProvider({ children }: ProviderProps) {
  const { workouts, deleteWorkout } = useWorkouts();
  return (
    <WorkoutContext.Provider value={{ workouts, deleteWorkout }}>
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkoutContext() {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error("useWorkoutContext must be used within a WorkoutProvider");
  }
  return context;
}

export default WorkoutContext;
