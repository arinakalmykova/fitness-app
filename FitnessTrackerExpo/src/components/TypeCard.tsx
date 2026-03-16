import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";

type Props = {
  type: "strength" | "cardio" | "yoga" | "running";
  onPress?: () => void;
};

export default function TypeCard({ type, onPress }: Props) {
  const { theme } = useTheme();

  const typeIcons: Record<Props["type"], keyof typeof Ionicons.glyphMap> = {
    strength: "barbell",
    cardio: "heart",
    yoga: "body",
    running: "walk",
  };

  const colors: Record<Props["type"], string> = {
    strength: "#F06292",
    cardio: "#FF8A65",
    yoga: "#4DB6AC",
    running: "#FFD54F",
  };

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors[type] }]}
      onPress={onPress}
    >
      <Ionicons name={typeIcons[type]} size={28} color="#fff" />
      <Text style={styles.text}>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
    gap: 10,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
});