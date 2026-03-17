import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";
import { useWorkouts } from "../hooks/useWorkouts";
import type { Exercise, Workout } from "../components/WorkoutCard";
import ExerciseItem from "../components/ExerciseItem";
import { Modal } from "react-native";
import ThemeToogle from "../components/ThemeToogle";

const workoutTypes = [
  { type: "strength", icon: "barbell", color: "#F06292" },
  { type: "cardio", icon: "heart", color: "#FF8A65" },
  { type: "yoga", icon: "body", color: "#4DB6AC" },
  { type: "running", icon: "walk", color: "#FFD54F" },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
  header: {
    gap: 6,
  },
  section: {
    marginTop: 20,
    gap: 10,
  },
  typeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },
  typeCard: {
    width: "48%",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  typeText: {
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
  },
  textButton: {
    textAlign: "center",
  },
  button: {
    boxShadow: "0px 0px 27px 0px rgba(174, 213, 96, 0.2) ",
    padding: 20,
    borderRadius: 20,
    marginBottom: 10,
    marginTop: 10,
  },
});

export default function WorkoutScreen({ navigation }: any) {
  const { theme } = useTheme();
  const { createWorkout } = useWorkouts();
  const [type, setType] = useState<Workout["type"] | null>(null);
  const [duration, setDuration] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [newExercise, setNewExercise] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");

  const addExercise = () => {
    if (newExercise.trim() !== "") {
      const exercise: Exercise = {
        name: newExercise,
        time: 5,
      };
      setExercises([...exercises, exercise]);
      setNewExercise("");
    }
  };

  useEffect(() => {
    if (modalVisible) {
      const timer = setTimeout(() => {
        setModalVisible(false);
      }, 1500); 

      return () => clearTimeout(timer);
    }
  }, [modalVisible]);

  const startWorkout = async () => {
    if (!type || !duration || exercises.length === 0) {
      setModalText("Заполните все поля!");
      setModalVisible(true);
      return;
    }

    const workout: Workout = {
      id: Date.now(),
      type,
      duration: Number(duration),
      calories: Math.round(Number(duration) * 8),
      date: new Date().toISOString(),
      exercises,
    };

    try {
      await createWorkout(workout);

      setModalText("Тренировка добавлена!");
      setModalVisible(true);
    } catch (err) {
      console.error(err);
      setModalText("Ошибка при сохранении");
      setModalVisible(true);
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.header}>
        <Text style={[{ color: theme.colors.textTitle }, theme.fonts.h1]}>
          Новая тренировка
        </Text>
        <Text style={[{ color: theme.colors.text }, theme.fonts.text]}>
          Выберите параметры и упражнения
        </Text>
        <ThemeToogle />
      </View>

      <View style={styles.section}>
        <Text style={[{ color: theme.colors.text }, theme.fonts.text]}>
          Тип тренировки:
        </Text>
        <View style={styles.typeGrid}>
          {workoutTypes.map((w) => (
            <TouchableOpacity
              key={w.type}
              style={[
                styles.typeCard,
                {
                  backgroundColor:
                     type === w.type ? w.color :theme.colors.card,
                  borderColor:
                     type === w.type ? w.color :theme.colors.textTitle,
                },
              ]}
              onPress={() => setType(w.type as Workout["type"])}
            >
              <Ionicons name={w.icon as any} size={28} color={theme.colors.textTitle} />
              <Text style={[styles.typeText, { color: theme.colors.textTitle }]}>{w.type.toUpperCase()}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[{ color: theme.colors.text }, theme.fonts.text]}>
          Длительность (мин):
        </Text>
        <TextInput
          style={[
            styles.input,
            { borderColor: theme.colors.text, color: theme.colors.text },
          ]}
          keyboardType="numeric"
          value={duration}
          onChangeText={setDuration}
          placeholder="Введите минуты"
          placeholderTextColor="#888"
        />
      </View>

      <View style={styles.section}>
        <Text style={[{ color: theme.colors.text }, theme.fonts.text]}>
          Упражнения:
        </Text>
        {exercises.map((ex, index) => (
          <ExerciseItem key={index} item={ex} />
        ))}
        <TextInput
          style={[
            styles.input,
            { borderColor: theme.colors.text, color: theme.colors.text },
          ]}
          value={newExercise}
          onChangeText={setNewExercise}
          placeholder="Новое упражнение"
          placeholderTextColor="#888"
        />
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.colors.button }]}
          onPress={addExercise}
        >
          <Text style={[styles.textButton, theme.fonts.button]}>
            Добавить упражнение
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.button }]}
        onPress={startWorkout}
      >
        <Text style={[styles.textButton, theme.fonts.button]}>
          Добавить тренировку
        </Text>
      </TouchableOpacity>

      <Modal transparent visible={modalVisible} animationType="fade">
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: 50,
          }}
        >
          <View
            style={{
              backgroundColor: theme.colors.card,
              paddingVertical: 12,
              paddingHorizontal: 20,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: "#222",
            }}
          >
            <Text style={{ color: theme.colors.text }}>{modalText}</Text>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
