
import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { StyleSheet } from 'react-native';
import ThemeToogle from './../components/ThemeToogle';
import {useTheme} from './../theme/ThemeContext';

type Workout ={
    type: string,
    duration: number
}

const styles = StyleSheet.create({
        container: {
            flex: 1,
            display:'flex',
            paddingTop: 30,   
            paddingRight: 20,
            paddingBottom: 30, 
            paddingLeft: 20, 
            gap:20
        },
        header: {
            display: 'flex', 
            flexDirection:'row',
            gap: 10,
        },
        welcome: {
            display: 'flex',
            justifyContent: 'flex-start',
            gap: 10,
        },
        welcomeTitle: {
            fontSize: 32,
            lineHeight: 43, 
        },
        title: {
            fontSize: 24,
            textAlign: 'center',
            lineHeight: 24, 
        },
        text: {
            fontSize: 16,
            lineHeight: 19, 
            margin:0
        },
        workoutItem: {
            backgroundColor: 'blue'
        },
        button: {
            backgroundColor:'#aed560',
            boxShadow:'0px 0px 27px 0px rgba(174, 213, 96, 0.2) ',
            padding: 20,
            borderRadius:20,
        },
        textButton: {
            textAlign:'center',
            fontSize:18,
            lineHeight: 21, 
        },
        historyBlock:{
            display:'flex',
            alignItems:'flex-start',
            marginTop:10,
        }
    });

export default function DashboardScreen({navigation}:any) {
    const [workouts,setWorkouts] = useState<Workout[]>([]);
    const {theme} = useTheme();

    useEffect(() => {
        fetch("http://10.0.2.2:5000/workouts")
        .then( res => res.json())
        .then(data => setWorkouts(data))
        .catch(err => console.log(err));
    },[]);
   
    return (
     <View style={[styles.container, {backgroundColor:theme.colors.background}]}>
        <View style={styles.header}>
            <View style={styles.welcome}>
                <Text style={[styles.welcomeTitle, {color: theme.colors.textTitle, fontFamily:theme.fonts.bold}]}>С возвращением!</Text>
                <Text style={[styles.text, {color: theme.colors.text, fontFamily:theme.fonts.regular}]}>Готовы добиться своих целей?</Text>
            </View>
            <ThemeToogle/>
        </View>
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Workout')}>
                <Text style={[styles.textButton, {fontFamily:theme.fonts.bold}]}>Начать тренировку</Text>
        </TouchableOpacity>
        <View style={styles.historyBlock}>
            <Text style={[styles.title, { color: theme.colors.textTitle, fontFamily:theme.fonts.bold }]}>История тренировок:</Text>
            {workouts.length === 0 ? (
                <Text style={{ color: theme.colors.textTitle, fontFamily:theme.fonts.regular }}>Нет тренировок</Text>
            ) : (
                <FlatList
                data={workouts}
                renderItem={({ item }) => (
                    <View style={[styles.workoutItem, { backgroundColor: theme.colors.text }]}>
                    <Text style={{ color: theme.colors.background }}>Тип: {item.type}</Text>
                    <Text style={{ color: theme.colors.background }}>Время: {item.duration}</Text>
                    </View>
                )}
                />
            )}
            </View>
        </View>

    );
}

