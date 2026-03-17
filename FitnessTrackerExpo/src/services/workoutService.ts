const API_URL = "http://10.0.2.2:5000";

export const getWorkouts = async () => {
  const res = await fetch(`${API_URL}/workouts`);
  return res.json();
};

export const deleteWorkoutService = async (id: number) => {
  const res = await fetch(`${API_URL}/workouts/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Ошибка сервера: ${res.status} ${text}`);
  }

  return res.json(); 
};

export const createWorkoutService = async (workout: any) => {
  const res = await fetch(`${API_URL}/workouts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(workout),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Ошибка: ${res.status} ${text}`);
  }

  return res.json();
};