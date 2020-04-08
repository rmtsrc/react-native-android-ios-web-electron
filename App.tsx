import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';

export default function App() {
  const platform = Platform.OS === 'web' && navigator.userAgent.includes('Electron') ? 'electron' : Platform.OS;

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Text>Current platform: {platform}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
