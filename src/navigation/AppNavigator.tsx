import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS } from '../constants/theme';

// Screens
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ControlScreen from '../screens/ControlScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';

import { useStore } from '../store/useStore';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.card,
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
          height: 70,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarLabelStyle: {
          fontSize: 10,
          ...FONTS.tech,
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: any;
          if (route.name === 'HOME') iconName = 'home';
          else if (route.name === 'CONTROL') iconName = 'robot-industrial';
          else if (route.name === 'PROFILE') iconName = 'account';
          else if (route.name === 'SETTINGS') iconName = 'cog';

          return (
            <MaterialCommunityIcons 
              name={iconName} 
              size={24} 
              color={color} 
              style={focused && {
                shadowColor: COLORS.primary,
                shadowRadius: 10,
                shadowOpacity: 0.8,
                elevation: 10,
              }}
            />
          );
        },
      })}
    >
      <Tab.Screen name="HOME" component={HomeScreen} />
      <Tab.Screen name="CONTROL" component={ControlScreen} />
      <Tab.Screen name="PROFILE" component={ProfileScreen} />
      <Tab.Screen name="SETTINGS" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { isAuthenticated } = useStore();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <Stack.Screen name="MainTabs" component={TabNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
