import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import AppNavigator from './src/navigation/AppNavigator';
import BootScreen from './src/screens/BootScreen';

export default function App() {
  const [booted, setBooted] = useState(false);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <StatusBar style="light" translucent />
        {!booted ? (
          <BootScreen onFinish={() => setBooted(true)} />
        ) : (
          <AppNavigator />
        )}
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
