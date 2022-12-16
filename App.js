import React, { createContext, useState, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import homeScreen from './components/homeScreen';
import { onAuthStateChanged } from 'firebase/auth';

const Stack = createNativeStackNavigator();
const AuthUserContext = createContext();

const AuthUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthUserContext.Provider value={[user, setUser]}>
      {children}
    </AuthUserContext.Provider>
  )
}

// function HomeScreen() {
//   <Stack.Navigator>
//     <Stack.Screen name='LoginForm' component={LoginForm} />
//   </Stack.Navigator>
// }

// function RootNavigator() {
//   return (
//     <NavigationContainer>
//       <HomeScreen />
//     </NavigationContainer>
//   )
// }
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="LoginForm" component={LoginForm} />
        <Stack.Screen name="SignupForm" options={{ headerShown: false }} component={SignupForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
  // return <RootNavigator />
}

