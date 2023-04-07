import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from '../config/firebase';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { initializeApp } from 'firebase/app';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@rneui/themed';


export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation()
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const handleLogin = () => {
        if (email !== "" && password !== "") {
            signInWithEmailAndPassword(auth, email, password)
                .then(() => console.log('Login Success!'))
                .catch((err) => Alert.alert('Please Enter Valid Credentials', err.message))
        } else {
            Alert.alert("Please Enter Valid Credentials");
        }
    }


    return (
        <>
            {/* <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }} >
                <Card>
                    <Card.Title style={{ fontSize: '30px' }}>CARPORT</Card.Title>
                    <Card.Divider />
                    <Text>Email</Text>
                    <Input placeholder="Email" secureTextEntry={false}
                        value={email}
                        onChangeText={text => setEmail(text)} />
                    <Text>Password</Text>
                    <Input placeholder="Password" secureTextEntry={true}
                        value={password}
                        onChangeText={text => setPassword(text)} />
                    <Button
                        title="Log in"
                        loading={false}
                        loadingProps={{ size: 'small', color: '#171717' }}
                        buttonStyle={{
                            backgroundColor: '#EA580C',
                            borderRadius: 5,
                        }}
                        titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
                        containerStyle={{
                            marginHorizontal: 50,
                            height: 50,
                            width: 200,
                            marginVertical: 10,
                        }}
                        onPress={handleLogin}
                    />
                    <Card.Title onPress={() => console.log('Forget Password!')}> Forgot Password? </Card.Title>
                    <Card.Divider />
                    <Text style={{ textAlign: 'center' }}>Need an account? <Text onPress={() => navigation.push('SignUp')} style={{ color: 'red' }}>SIGN UP</Text></Text>
                </Card>
            </View > */}
            <View style={styles.container}>
                <View style={styles.subcontainer}>
                    <Text style={styles.title}>Sign in</Text>
                    <Text style={styles.subtitle}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="mail@carport.com"
                        onChangeText={text => setEmail(text)}
                        value={email}
                        keyboardType="email-address"
                    />
                    <Text style={styles.subtitle}>Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        onChangeText={text => setPassword(text)}
                        value={password}
                        secureTextEntry
                    />
                    <View>
                        <Button
                            buttonStyle={styles.buttonStyle}
                            title="Log In"
                            onPress={handleLogin}
                        />
                    </View>
                    <Text style={styles.footerText}>Need an account? </Text>
                    <Text onPress={() => navigation.push('SignUp')} style={styles.footerTextS}>Sign Up</Text>
                </View>
            </View>

        </>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subcontainer: {
        width: '90%',
        textAlign: 'left'
    },
    title: {
        fontSize: 40,
        fontWeight: '400',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '300',
        marginVertical: 5,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        padding: 10,
        backgroundColor: 'white',
    },
    buttonStyle: {
        backgroundColor: '#EA580C',
        borderRadius: 5,
        margin: 20,
        fontWeight: '300',
        width: 340,
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
});
