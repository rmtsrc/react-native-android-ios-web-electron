import React from 'react';
import { Text, Platform } from 'react-native';

export default function Index() {
  return <Text>Platform: Electron ({Platform.OS})</Text>;
}
