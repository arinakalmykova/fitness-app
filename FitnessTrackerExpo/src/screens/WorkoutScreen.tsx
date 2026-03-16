import { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";

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
    color: "#fff",
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
    boxShadow:'0px 0px 27px 0px rgba(174, 213, 96, 0.2) ',
    padding: 20,
    borderRadius:20,
    marginBottom:10,
    marginTop:10
    },

});

export default function WorkoutScreen({ navigation }: any) {
  const { theme } = useTheme();

  const [type, setType] = useState<string | null>(null);
  const [duration, setDuration] = useState("");
  const [exercises, setExercises] = useState<string[]>([]);
  const [newExercise, setNewExercise] = useState("");

  const addExercise = () => {
    if (newExercise.trim() !== "") {
      setExercises([...exercises, newExercise]);
      setNewExercise("");
    }
  };

  const startWorkout = () => {
    if (!type || !duration || exercises.length === 0) {
      alert("Заполните все поля!");
      return;
    }

    const workout = {
      id: Date.now(),
      type,
      duration: Number(duration),
      calories: Math.round(Number(duration) * 8),
      date: new Date().toISOString(),
      exercises,
    };

    console.log("Workout saved:", workout);
    alert("Тренировка добавлена!");
    navigation.goBack();
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={[{ color: theme.colors.textTitle }, theme.fonts.h1]}>Новая тренировка</Text>
        <Text style={[{ color: theme.colors.text }, theme.fonts.text]}>
          Выберите параметры и упражнения
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[{ color: theme.colors.text }, theme.fonts.text]}>Тип тренировки:</Text>
        <View style={styles.typeGrid}>
          {workoutTypes.map((w) => (
            <TouchableOpacity
              key={w.type}
              style={[
                styles.typeCard,
                {
                  backgroundColor: type === w.type ? w.color : theme.colors.card,
                },
              ]}
              onPress={() => setType(w.type)}
            >
              <Ionicons name={w.icon as any} size={28} color="#fff" />
              <Text style={styles.typeText}>{w.type.toUpperCase()}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[{ color: theme.colors.text }, theme.fonts.text]}>Длительность (мин):</Text>
        <TextInput
          style={[styles.input, { borderColor: theme.colors.text, color: theme.colors.text }]}
          keyboardType="numeric"
          value={duration}
          onChangeText={setDuration}
          placeholder="Введите минуты"
          placeholderTextColor="#888"
        />
      </View>

      <View style={styles.section}>
        <Text style={[{ color: theme.colors.text }, theme.fonts.text]}>Упражнения:</Text>
        {exercises.map((ex, index) => (
          <Text key={index} style={[{ color: theme.colors.text }, theme.fonts.text]}>
            • {ex}
          </Text>
        ))}
        <TextInput
          style={[styles.input, { borderColor: theme.colors.text, color: theme.colors.text }]}
          value={newExercise}
          onChangeText={setNewExercise}
          placeholder="Новое упражнение"
          placeholderTextColor="#888"
        />
           <TouchableOpacity
                    style={[styles.button,{backgroundColor:theme.colors.button}]} onPress={addExercise}>
           <Text style={[styles.textButton, theme.fonts.button]}>Добавить упражнение</Text>
        </TouchableOpacity>
      </View>

         <TouchableOpacity
                  style={[styles.button,{backgroundColor:theme.colors.button}]} onPress={startWorkout}>
         <Text style={[styles.textButton, theme.fonts.button]}>Начать тренировку</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}