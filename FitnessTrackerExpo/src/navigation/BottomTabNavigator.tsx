import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import DashboardScreen from '../screens/DashboardScreen';
import WorkoutScreen from '../screens/WorkoutScreen';
import HistoryScreen from '../screens/HistoryScreen';
import { useTheme } from './../theme/ThemeContext';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.button,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarStyle: {
            backgroundColor: theme.colors.background,
            paddingTop: 10,
            paddingBottom: 15
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";
          if (route.name === 'Главная') iconName = 'home';
          else if (route.name === 'Тренировки') iconName = 'barbell';
          else if (route.name === 'История') iconName = 'time';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Главная" component={DashboardScreen} />
      <Tab.Screen name="Тренировки" component={WorkoutScreen} />
      <Tab.Screen name="История" component={HistoryScreen} />
    </Tab.Navigator>
  );
}