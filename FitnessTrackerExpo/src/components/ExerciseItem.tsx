import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import type { Exercise } from "./WorkoutCard";

const styles = StyleSheet.create({
  exerciseItem: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#aed560",
    gap: 10,
  },
});

export default function ExerciseItem({ item }: { item: Exercise }) {
  const { theme } = useTheme();
  return (
    <View style={[styles.exerciseItem, { backgroundColor: theme.colors.card }]}>
      <Text style={[theme.fonts.h2, { color: theme.colors.button }]}>
        {item.name}
      </Text>

      <Text style={[theme.fonts.text, { color: theme.colors.text }]}>
        {item.time} мин
      </Text>
    </View>
  );
}
