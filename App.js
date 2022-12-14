import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { lightColors, Card, Input, Button, SocialIcon, SocialIconProps } from '@rneui/themed';
import SignupForm from './components/SignupForm';
import Login from './pages/Login';
import LoginForm from './components/LoginForm';


export default function App() {

  return (
    <>
      <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }} >
        <LoginForm/>
      </View >
    </>
  );
}

