import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from './src/theme/colors';

import DashboardScreen from './src/screens/DashboardScreen';
import SensorsScreen from './src/screens/SensorsScreen';
import IrrigationScreen from './src/screens/IrrigationScreen';
import FertilizerScreen from './src/screens/FertilizerScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Ana Sayfa') iconName = focused ? 'home' : 'home-outline';
            else if (route.name === 'Sensörler') iconName = focused ? 'hardware-chip' : 'hardware-chip-outline';
            else if (route.name === 'Sulama') iconName = focused ? 'water' : 'water-outline';
            else if (route.name === 'Gübre') iconName = focused ? 'flask' : 'flask-outline';
            else if (route.name === 'Profil') iconName = focused ? 'person' : 'person-outline';

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.muted,
          headerShown: false,
          tabBarStyle: {
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
            backgroundColor: COLORS.card,
            borderTopColor: COLORS.border,
          }
        })}
      >
        <Tab.Screen name="Ana Sayfa" component={DashboardScreen} />
        <Tab.Screen name="Sensörler" component={SensorsScreen} />
        <Tab.Screen name="Sulama" component={IrrigationScreen} />
        <Tab.Screen name="Gübre" component={FertilizerScreen} />
        <Tab.Screen name="Profil" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
