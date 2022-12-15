

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="LoginForm" component={LoginForm} />
        <Stack.Screen name="SignupForm" options={{ title: "" }} component={SignupForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

