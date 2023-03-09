import React, { createContext, useState, useContext, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { firebaseConfig } from './config/firebase'
import { getAuth } from "firebase/auth";
import Home from './pages/Home';
import Login from './pages/Login';
import { onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import Add from './pages/Add';

const Stack = createNativeStackNavigator();
const AuthUserContext = createContext();

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const AuthUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthUserContext.Provider>
  );
};


function HomeScreen() {
  return (<Stack.Navigator>
    <Stack.Screen name='Home' component={Home} />
    <Stack.Screen options={{ presentation: 'modal' }} name='Add' component={Add} />
  </Stack.Navigator>);
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Login' component={Login} />
      {/* <Stack.Screen name='Signup' component={Signup} /> */}
    </Stack.Navigator>
  );
}

function RootNavigator() {
  const { user, setUser } = useContext(AuthUserContext);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async authenticatedUser => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setIsLoading(false);
      }
    );
    // unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, [user]);
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <HomeScreen /> : <AuthStack />}
    </NavigationContainer>
  );
}


export default function App() {
  console.log();
  return (
    <AuthUserProvider>
      <RootNavigator />
    </AuthUserProvider>
  );
}

