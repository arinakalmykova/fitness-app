
import { useState, useEffect } from "react";
import { View, Text, Button, FlatList } from 'react-native';
import { StyleSheet } from 'react-native';


type Workout ={
    type: string,
    duration: number
}

const styles = StyleSheet.create({
        container: {
            flex: 1,
            display:'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
        },
        welcome: {
            fontSize: 20,
            textAlign: 'center',
            margin: 10,
        },
        title: {
            fontSize: 20,
            textAlign: 'center',
            margin: 10,
        },
        workoutItem: {
            backgroundColor: 'blue'
        }
    });

export default function DashboardScreen({navigation}:any) {
    const [workouts,setWorkouts] = useState<Workout[]>([]);

    useEffect(() => {
        fetch("http://10.0.2.2:5000/workouts")
        .then( res => res.json())
        .then(data => setWorkouts(data))
        .catch(err => console.log(err));
    },[]);
   
    return (
     <View style={styles.container}>
        <Button
            title="Начать тренировку"
            onPress={() => navigation.navigate('Workout')}
        />

        <Text style={styles.title}>История тренировок:</Text>
        {workouts.length === 0? 
        (<Text>Нет тренировок</Text>):
            ( <FlatList
                data={workouts}
                renderItem={({item}) => (
                    <View style={styles.workoutItem}>
                        <Text>Тип: {item.type}</Text>
                        <Text>Время: {item.duration}</Text>
                    </View> )}>
                </FlatList>
        )}
     </View>
    );
}

