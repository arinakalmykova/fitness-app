import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WorkoutDetailScreen from "./../screens/WorkoutDetailScreen";
import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createNativeStackNavigator();

function MainTabsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={BottomTabNavigator} />
      <Stack.Screen name="WorkoutDetail" component={WorkoutDetailScreen} />
    </Stack.Navigator>
  );
}

export default function AppNavigation() {
  return <MainTabsStack />;
}