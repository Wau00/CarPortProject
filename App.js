import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Home from './pages/Home'

const Stack = createNativeStackNavigator();

function HomeScreen() {
  <Stack.Navigator>
    <Stack.Screen name='LoginForm' component={LoginForm} />
  </Stack.Navigator>
}

function RootNavigator() {
  return (
    <NavigationContainer>
      <HomeScreen />
    </NavigationContainer>
  )
}
export default function App() {
  // return (
  //   <NavigationContainer>
  //     <Stack.Navigator>
  //       <Stack.Screen options={{ headerShown: false }} name="LoginForm" component={LoginForm} />
  //       <Stack.Screen name="SignupForm" options={{ title: "" }} component={SignupForm} />
  //     </Stack.Navigator>
  //   </NavigationContainer>
  // );
  return <RootNavigator />
}

