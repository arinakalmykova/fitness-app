import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from './../screens/DashboardScreen';
import WorkoutScreen from './../screens/WorkoutScreen';
import HistoryScreen from './../screens/HistoryScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
    return (
        <Stack.Navigator initialRouteName="Dashboard">
            <Stack.Screen 
                name="Dashboard" 
                component={DashboardScreen}
                options={{title: 'Панель управления'}} 
            />
            <Stack.Screen 
                name="Workout" 
                component={WorkoutScreen}
                options={{title: 'Тренировки'}}
            />
            <Stack.Screen 
                name="History" 
                component={HistoryScreen}
                options={{title: 'История'}}
            />
        </Stack.Navigator>
    );
}