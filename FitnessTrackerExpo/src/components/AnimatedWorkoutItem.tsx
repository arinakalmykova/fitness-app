import React, { useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import WorkoutCard, { Workout } from "./WorkoutCard";

type Props = {
  item: Workout;
  index: number;
  onPress: (workout: Workout) => void;
  onDelete: (id: number) => void;
};

export default function AnimatedWorkoutItem({
  item,
  index,
  onPress,
  onDelete,
}: Props) {
  const translateY = useSharedValue(30);
  const opacity = useSharedValue(0);

  useFocusEffect(
    useCallback(() => {
      translateY.value = 30;
      opacity.value = 0;

      translateY.value = withDelay(
        index * 150,
        withTiming(0, { duration: 400 }),
      );
      opacity.value = withDelay(index * 150, withTiming(1, { duration: 400 }));
    }, []),
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={animatedStyle}>
      <WorkoutCard workout={item} onPress={onPress} onDelete={onDelete} />
    </Animated.View>
  );
}
