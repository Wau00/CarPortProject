import { KeyboardAvoidingView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
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
            <Text style={styles.title}>Carport</Text>
            <View style={styles.content}>
                <Text style={styles.bodyText}>A way to manage </Text>
                <Text style={styles.bodyText}>your parking</Text>

            </View>
            <View style={styles.subcontainer}>
                <Button buttonStyle={styles.buttonStyle} title='Sign in' onPress={() => navigation.navigate('Login')}></Button>
            </View>
            <Text style={styles.footerText}>Need an account? </Text>
            <Text onPress={() => navigation.push('SignUp')} style={styles.footerTextS}>Sign Up</Text>
        </View >

    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        marginVertical: 150,
    },
    buttonStyle: {
        backgroundColor: '#EA580C',
        borderRadius: 5,
        margin: 20,
        fontWeight: '300',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    bodyText: {
        textAlign: 'center',
        fontWeight: '300',
        fontSize: 40,
    },
    footerText: {
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: '300',
        fontSize: 17,

    },
    footerTextS: {
        textAlign: 'center',
        textDecorationLine: 'underline',
        color: 'grey',
        fontWeight: '300',
        fontSize: 17,

    },
    subcontainer: {
        marginBottom: 90,
    }

})