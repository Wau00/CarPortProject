import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignupForm'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Tab = createNativeStackNavigator();

const Login = () => {

    return (
        <Tab.Navigator>
            <Tab.Screen options={{ headerShown: false }} name="LoginForm" component={LoginForm} />
            <Tab.Screen options={{ headerShown: false }} name="SignupForm" component={SignupForm} />
        </Tab.Navigator>
    )
}

export default Login

const styles = StyleSheet.create({})