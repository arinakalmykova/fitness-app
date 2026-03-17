import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import type { Workout } from "../components/WorkoutCard";
import { Ionicons } from "@expo/vector-icons";
import ExerciseItem from "../components/ExerciseItem";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 20,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  infoBlock: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#222222",
    gap: 10,
  },

  exercisesBlock: {
    marginTop: 10,
    gap: 10,
  },

  exerciseItem: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#222222",
    gap: 5,
  },
  exercises: {
    marginTop: 10,
    display: "flex",
    flexDirection: "column",
  }
});

export default function WorkoutDetailScreen({ route, navigation }: any) {
  const { theme } = useTheme();
  const { workout }: { workout: Workout } = route.params;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => {
           navigation.navigate("Tabs");
          }}
        >
          <Ionicons name="arrow-back" size={26} color={theme.colors.textTitle} />
        </TouchableOpacity>

        <Text style={[theme.fonts.h1, { color: theme.colors.textTitle }]}>
          {workout.type.charAt(0).toUpperCase() + workout.type.slice(1)}
        </Text>
      </View>

      <View style={[styles.infoBlock, { backgroundColor: theme.colors.card }]}>
        <Text style={[theme.fonts.text, { color: theme.colors.text }]}>
          Длительность: {workout.duration} мин
        </Text>

        <Text style={[theme.fonts.text, { color: theme.colors.text }]}>
          Калории: {workout.calories}
        </Text>

        <Text style={[theme.fonts.text, { color: theme.colors.text }]}>
          Дата: {new Date(workout.date).toLocaleDateString()}
        </Text>
      </View>

      {workout.exercises && workout.exercises.length > 0 && (
        <View style={styles.exercisesBlock}>
          <Text style={[theme.fonts.h2, { color: theme.colors.textTitle }]}>
            Упражнения
          </Text>

          <FlatList
            data={workout.exercises}
            style={styles.exercises}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ gap: 10 }}
            renderItem={({ item }) => (
            <ExerciseItem item={item} />
            )}
          />
        </View>
      )}
    </View>
  );
}