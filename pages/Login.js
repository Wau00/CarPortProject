import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignupForm'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/core'
import { getAuth } from "firebase/auth";

const Tab = createNativeStackNavigator();

const Login = () => {
    const navigation = useNavigation()
    const auth = getAuth();



    // useEffect(() => {
    //     const unsubscribe = auth.onAuthStateChanged(user => {
    //         if (user) {
    //             navigation.replace("Home")
    //         }
    //     })
    //     return unsubscribe
    // }, [])

    return (
        <Tab.Navigator>
            <Tab.Screen options={{ headerShown: false }} name="LoginForm" component={LoginForm} />
            <Tab.Screen options={{ headerShown: false }} name="SignupForm" component={SignupForm} />
        </Tab.Navigator>


    )
}

export default Login

const styles = StyleSheet.create({})