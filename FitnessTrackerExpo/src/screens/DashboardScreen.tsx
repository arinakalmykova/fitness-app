
import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { StyleSheet } from 'react-native';
import ThemeToogle from './../components/ThemeToogle';
import {useTheme} from './../theme/ThemeContext';
import WorkoutCard from './../components/WorkoutCard';
import type {Workout} from  './../components/WorkoutCard';

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
        title: {
            textAlign: 'center',
        },
        button: {
            boxShadow:'0px 0px 27px 0px rgba(174, 213, 96, 0.2) ',
            padding: 20,
            borderRadius:20,
        },
        textButton: {
            textAlign:'center'
        },
        historyBlock:{
            display:'flex',
            alignItems:'flex-start',
            marginTop:10,
        },
        list: {
            display:'flex',
            flexDirection:'column',
            gap:5,
            width:"100%",
            marginTop:10
        },
        stats:{
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            gap:5,
            
        },
        statsItem:{
            padding: 16,
            borderRadius: 12,
            borderColor: '#222222',
            borderWidth: 1,

        },
        statsNumbers:{
            textAlign:'center',
            color:'#aed560',
            marginTop:10
        },
        textRight:{
            textAlign:'right',
            color:'#aed560'
        },
    });

    export type Stats ={
        numberWorkout:number | null,
        timeWorkout:number | null
    }

export default function DashboardScreen({navigation}:any) {
    const [workouts,setWorkouts] = useState<Workout[]>([]);
    const [stats, setStats] = useState<Stats | null>(null);
    const {theme} = useTheme();

   useEffect(() => {
    fetch("http://10.0.2.2:5000/workouts")
        .then(res => res.json())
        .then(data => {
        setWorkouts(data.workouts || []);
        setStats({
            numberWorkout: data.numberWorkout,
            timeWorkout: data.timeWorkout
        });
        })
        .catch(err => console.log(err));
    });

    return (
     <View style={[styles.container, {backgroundColor:theme.colors.background}]}>
        <View style={styles.header}>
            <View style={styles.welcome}>
                <Text style={[ {color: theme.colors.textTitle}, theme.fonts.h1]}>С возвращением!</Text>
                <Text style={[{color: theme.colors.text}, theme.fonts.text]}>Готовы добиться своих целей?</Text>
            </View>
            <ThemeToogle/>
        </View>
         <View style={styles.stats}>
            <View style={[styles.statsItem,{backgroundColor:theme.colors.card}]}>
                <Text style={[ {color: theme.colors.text}, theme.fonts.text]}>Всего тренировок</Text>
                <Text style={[styles.statsNumbers, theme.fonts.h1]}>{stats?.numberWorkout}</Text>
            </View>
            <View style={[styles.statsItem,{backgroundColor:theme.colors.card}]}>
                <Text style={[ {color: theme.colors.text}, theme.fonts.text]}>Общее кол-во минут</Text>
                <Text style={[styles.statsNumbers, theme.fonts.h1]}>{stats?.timeWorkout}</Text>
            </View>
        </View>
        <TouchableOpacity
            style={[styles.button,{backgroundColor:theme.colors.button}]}
            onPress={() => navigation.navigate('Тренировки')}>
                <Text style={[styles.textButton, theme.fonts.button]}>Начать тренировку</Text>
        </TouchableOpacity>
        <View style={styles.historyBlock}>
            <Text style={[styles.title, { color: theme.colors.textTitle}, theme.fonts.h2 ]}>История тренировок</Text>
            {workouts.length === 0 ? (
                <Text style={[{ color: theme.colors.textTitle}, theme.fonts.text]}>Нет тренировок</Text>
            ) : (
                <FlatList
                data={workouts.slice(0,3)}
                initialNumToRender={3}
                style={styles.list}
                renderItem={({ item }) => (
                   <WorkoutCard workout={item}/>
                )}
                />
            )}
            </View>
            <Text style={[styles.textRight, theme.fonts.text]} onPress={() => navigation.navigate("История")}>Посмотреть все</Text>
        </View>

    );
}

