
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});

export default function HistoryScreen({navigation}:any) {
    return (
        <View style={styles.container}>
            <Text>История тренировок</Text>
        </View>
    );
}