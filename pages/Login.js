import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignupForm'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@rneui/themed';



const Tab = createNativeStackNavigator();

const Login = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text h4>Carport</Text>
            <Text>A way to manage </Text>
            <Text>your parking</Text>
            <Text style={{ textAlign: 'center' }}>Already have an account? <Text onPress={() => navigation.navigate('Login')} style={{ color: 'red' }}>LOG IN</Text></Text>
            <Text style={{ textAlign: 'center' }}>Need an account? <Text onPress={() => navigation.push('SignUp')} style={{ color: 'red' }}>SIGN UP</Text></Text>
        </View>

    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignContent: 'center', justifyContent: 'center'
    },
})