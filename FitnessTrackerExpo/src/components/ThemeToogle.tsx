import { TouchableOpacity, Text, StyleSheet} from "react-native";
import {useTheme} from './../theme/ThemeContext';
import {Ionicons} from "@expo/vector-icons";

const styles = StyleSheet.create({
    button:{
        position: 'absolute',
        top: 5,
        right: 5,
        padding: 10,
        borderRadius: 25,
        backgroundColor: 'transparent',
        zIndex: 10,
    }
})

export default function ThemeToogle(){
    const {theme, toggleTheme} = useTheme();
    return (
        <TouchableOpacity style={[styles.button, {backgroundColor:theme.colors.textTitle}]} onPress={() => toggleTheme()}>
            <Ionicons
                name={theme.colors.background === 'white'? 'sunny' : 'moon'}
                size={24}
                color={theme.colors.background}
                />
        </TouchableOpacity>
    )
}
