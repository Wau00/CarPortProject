import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, } from 'react-native';
import { lightColors, Card, Input, Button, SocialIcon, SocialIconProps } from '@rneui/themed';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
// import { auth } from '../config/firebase';
import { Formik, Field, Form } from 'formik';
import { useNavigation } from '@react-navigation/native';



export default function SignupForm() {


    const auth = getAuth();
    const navigation = useNavigation()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setPasswordd] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleSignup = () => {
        if (password !== repeatPassword) {
            window.alert("Passwords must match!")
        };

        if (email !== "" && password !== "") {
            createUserWithEmailAndPassword(auth, email, password)
                .then(() => console.log('Signup Success!'))
                .catch((err) => alert(err))
        }
    }
    return (
        <>

            <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
                <Card>
                    <Card.Title style={{ fontSize: '30px' }}>CARPORT</Card.Title>
                    <Card.Divider />
                    <Text>First Name</Text>
                    <Input placeholder="First Name"
                        secureTextEntry={false}
                        value={fullName}
                        onChangeText={text => setFullName(text)}
                    />
                    <Text>Email</Text>
                    <Input placeholder="mail@carport.com" secureTextEntry={false}
                        onChangeText={text => setEmail(text)}
                        value={email} />
                    <Text>Phone Number</Text>
                    <Input placeholder="+1 (000) 000-000" secureTextEntry={false}
                        onChangeText={text => setPhoneNumber(text)}
                        value={phoneNumber} />
                    <Text>Password</Text>
                    <Input placeholder="Password" secureTextEntry={true}
                        onChangeText={text => setPassword(text)}
                        value={password} />
                    <Text>Repeat Password</Text>
                    <Input placeholder="Repeat Password"
                        secureTextEntry={true}
                        onChangeText={text => setPasswordd(text)}
                        value={repeatPassword} />
                    <Button
                        title="Sign Up"
                        loading={false}
                        loadingProps={{ size: 'small', color: 'white' }}
                        buttonStyle={{
                            backgroundColor: 'rgba(111, 202, 186, 1)',
                            borderRadius: 5,
                        }}
                        titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
                        containerStyle={{
                            marginHorizontal: 50,
                            height: 50,
                            width: 200,
                            marginVertical: 10,
                        }}
                        onPress={handleSignup}
                    />
                    <Text style={{ textAlign: 'center' }}>Already have an account? <Text onPress={() => navigation.push('LoginForm')} style={{ color: 'red' }}>LOG IN</Text></Text>
                    <Card.Divider />
                </Card>
            </View>
        </>
    );
}