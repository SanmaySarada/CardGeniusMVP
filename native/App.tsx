import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Screens
import { Onboarding } from './src/screens/Onboarding';
import { Wallet } from './src/screens/Wallet';
import { AddCard } from './src/screens/AddCard';
import { Dashboard } from './src/screens/Dashboard';
import { Map } from './src/screens/Map';
import { Notifications } from './src/screens/Notifications';
import { Settings } from './src/screens/Settings';
import { CardDetail } from './src/screens/CardDetail';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#757575',
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#E5E5E5',
          paddingTop: 8,
          paddingBottom: 8,
          height: 80,
        },
      }}
    >
      <Tab.Screen
        name="WalletTab"
        component={Wallet}
        options={{
          title: 'Wallet',
          tabBarIcon: () => '💳',
        }}
      />
      <Tab.Screen
        name="MapTab"
        component={Map}
        options={{
          title: 'Map',
          tabBarIcon: () => '🗺️',
        }}
      />
      <Tab.Screen
        name="NotificationsTab"
        component={Notifications}
        options={{
          title: 'Alerts',
          tabBarIcon: () => '🔔',
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator
          initialRouteName="Onboarding"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="Wallet" component={MainTabs} />
          <Stack.Screen
            name="AddCard"
            component={AddCard}
            options={{
              presentation: 'modal',
            }}
          />
          <Stack.Screen
            name="CardDetail"
            component={CardDetail}
            options={{
              presentation: 'modal',
            }}
          />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen name="Notifications" component={Notifications} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

