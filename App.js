import React, { createContext, useState, useContext, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth } from './config/firebase'
import Home from './pages/Home';
import Login from './pages/Login';
import Garage from './pages/Garage';
import Profile from './pages/Profile';
import { onAuthStateChanged } from 'firebase/auth';
import Add from './pages/Add';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';


const Stack = createNativeStackNavigator();
const AuthUserContext = createContext();


const AuthUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthUserContext.Provider>
  );
};

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
    <Stack.Screen options={{ presentation: 'modal' }} name="Add" component={Add} />
  </Stack.Navigator>
);
function HomeScreen() {

  const Drawer = createDrawerNavigator();
  const Stack = createNativeStackNavigator();
  return (
    <Drawer.Navigator>
      <Drawer.Screen name='Home' component={HomeStack} />
      <Drawer.Screen name='Profile' component={Profile} />
      <Drawer.Screen name='Garage' component={Garage} />
    </Drawer.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Login' component={Login} />
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
  console.log("Server Status: ON");
  return (
    <AuthUserProvider>
      <RootNavigator />
    </AuthUserProvider>
  );
}

