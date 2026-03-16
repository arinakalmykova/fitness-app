import React from 'react';
import {  StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppNavigation from './../navigation/AppNavigation';
import { NavigationContainer } from '@react-navigation/native';

export default function Layout() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
          <AppNavigation />
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});