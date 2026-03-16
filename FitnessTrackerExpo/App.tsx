import { StatusBar, StyleSheet} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigation from './src/navigation/AppNavigation';
import { NavigationContainer} from '@react-navigation/native';
import { ThemeProvider } from './src/theme/ThemeContext'
import { useTheme } from './src/theme/ThemeContext';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import {useState} from "react";

const loadFonts = () => {
  return Font.loadAsync({
    'GoogleSans-Regular': require('./assets/fonts/GoogleSans-Regular.ttf'),
    'GoogleSans-Bold': require('./assets/fonts/GoogleSans-Bold.ttf')
  });
};

export  function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <AppContent />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

function AppContent() {
  const { theme } = useTheme();
  return (
    <>
      <StatusBar
        barStyle={theme.colors.background === 'white' ? 'dark-content' : 'light-content'}
      />
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
