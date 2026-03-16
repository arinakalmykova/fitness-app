import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";
import { Pressable } from "react-native";

export type Workout = {
  id: number;
  type: "strength" | "cardio" | "yoga" | "running";
  duration: number;
  calories: number;
  date: string;
};

type Props = {
  workout: Workout;
};

export default function WorkoutCard({ workout }: Props) {
  const { theme } = useTheme();
  const typeIcons: Record<Workout["type"], keyof typeof Ionicons.glyphMap> = {
    strength: "barbell",
    cardio: "heart",
    yoga: "body",
    running: "walk",
  };

  return (
        <Pressable
            style={({ pressed }) => [
                styles.card,
                {
                backgroundColor: theme.colors.card,
                borderColor: pressed ? "#aed560" : "#222222",
                },
            ]}
            >
        <Ionicons
          name={typeIcons[workout.type]}
          size={24}
          color={"white"}
          style={styles.icon}
        />
        <View style={styles.content}>
            <View style={styles.header}>
                <Text style={[{ color: theme.colors.textTitle }, theme.fonts.h2]}>
                {workout.type.charAt(0).toUpperCase() + workout.type.slice(1)}
                </Text>
            </View>
            <View style={styles.info}>
                <Text style={[{ color: theme.colors.text }, theme.fonts.text]}>
                {workout.duration} мин
                </Text>
                <Text style={[{ color: theme.colors.text }, theme.fonts.text]}>
                {workout.calories} кал
                </Text>
                <Text style={[{ color: theme.colors.text }, theme.fonts.text]}>
                {new Date(workout.date).toLocaleDateString()}
                </Text>
            </View>
        </View>  
        </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
    borderColor: "#222222",
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    gap: 40, 
    alignItems:"center"
  },
   content: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  icon: {
    padding:20,
    backgroundColor: "#222222",
    color: '#aed560',
    borderRadius:10,

  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  info: {
    flexDirection: "row",
    gap: 15,
  },
});