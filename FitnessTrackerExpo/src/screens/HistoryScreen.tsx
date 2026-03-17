import { View, Text, FlatList, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import WorkoutCard from "../components/WorkoutCard";
import ThemeToogle from "../components/ThemeToogle";
import { useWorkoutContext } from "../store/WorkoutContext";
import AnimatedWorkoutItem from "../components/AnimatedWorkoutItem";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingRight: 20,
    paddingBottom: 30,
    paddingLeft: 20,
    gap: 20
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  titleBlock: {
    gap: 6
  },

  list: {
    width: "100%",
    marginTop: 10
  }
});

export default function HistoryScreen({ navigation }:  any) {
  const { theme } = useTheme();
  const { workouts, deleteWorkout } = useWorkoutContext();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>

      <View style={styles.header}>
        <View style={styles.titleBlock}>
          <Text style={[{ color: theme.colors.textTitle }, theme.fonts.h1]}>
            История
          </Text>

          <Text style={[{ color: theme.colors.text }, theme.fonts.text]}>
            Все ваши тренировки
          </Text>
        </View>

        <ThemeToogle />
      </View>

      {workouts.length === 0 ? (
        <Text style={[{ color: theme.colors.text }, theme.fonts.text]}>
          Нет тренировок
        </Text>
      ) : (
        <FlatList
          data={workouts}
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
          renderItem={({ item, index }) => (
                        <AnimatedWorkoutItem
                          item={item}
                          index={index}
                          onPress={(workout) =>
                            navigation.navigate("WorkoutDetail", { workout })
                          }
                          onDelete={(id) => deleteWorkout(id)}
                        />
                      )}
        />
      )}

    </View>
  );
}