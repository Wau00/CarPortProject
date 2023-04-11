import React, { createContext, useState, useContext, useEffect } from 'react';
import { View, ActivityIndicator, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth } from './config/firebase'
import { signOut } from "firebase/auth";
import Home from './pages/Home';
import Login from './pages/Login';
import Garage from './pages/Garage';
import Profile from './pages/Profile';
import Intro from './pages/Intro';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import { onAuthStateChanged } from 'firebase/auth';
import Add from './pages/Add';
import 'react-native-gesture-handler';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';


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
  <Stack.Navigator >
    <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
    <Stack.Screen options={{ presentation: 'modal', headerShown: false }} name="Add" component={Add} />
  </Stack.Navigator>
);


function CustomDrawerContent(props) {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("User signed out successfully.");
      })
      .catch((error) => {
        // An error happened.
        console.log("Error signing out:", error);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={{ marginBottom: 100 }}>
        <Button title="Sign Out" onPress={handleSignOut} />
      </View>
    </View>
  );
}

function HomeScreen() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerLabelStyle: {
          fontSize: 20,
          fontWeight: '400',
        },
        drawerActiveBackgroundColor: '#E5E5E5',
        drawerActiveTintColor: '#EA580C',
        drawerStyle: {
          backgroundColor: '#F5F5F5',

        },
        headerStyle: {
          backgroundColor: '#f2f2f2',
        },
        headerTintColor: 'black',
        headerTitleStyle: {
          fontSize: 1,
        },
      }}



      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeStack} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Garage" component={Garage} />
    </Drawer.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Intro' component={Intro} />
      <Stack.Screen name='Login' component={LoginForm} />
      <Stack.Screen name='SignUp' component={SignupForm} />
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

