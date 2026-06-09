import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

import DashboardScreen from '../screens/DashboardScreen';
import TarlalarScreen from '../screens/TarlalarScreen';
import IoTScreen from '../screens/IoTScreen';
import CalendarScreen from '../screens/CalendarScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const TABS = [
  { name: 'Ana Ekran',  component: DashboardScreen, on: 'home',          off: 'home-outline' },
  { name: 'Tarlalar',   component: TarlalarScreen,  on: 'leaf',          off: 'leaf-outline' },
  { name: 'IoT Paneli', component: IoTScreen,       on: 'hardware-chip', off: 'hardware-chip-outline' },
  { name: 'Takvim',     component: CalendarScreen,  on: 'calendar',      off: 'calendar-outline' },
  { name: 'Profil',     component: ProfileScreen,   on: 'person',        off: 'person-outline' },
];

export default function MainTabNavigator() {
  const { c } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const tab = TABS.find(t => t.name === route.name);
        return {
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? tab?.on : tab?.off} size={size} color={color} />
          ),
          tabBarActiveTintColor: c.primary,
          tabBarInactiveTintColor: c.textMuted,
          tabBarStyle: { backgroundColor: c.tabBar, borderTopColor: c.tabBorder, paddingBottom: 5, height: 60 },
          tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        };
      }}
    >
      {TABS.map(tab => (
        <Tab.Screen key={tab.name} name={tab.name} component={tab.component} />
      ))}
    </Tab.Navigator>
  );
}
