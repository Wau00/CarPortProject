import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, } from 'react-native';
import { lightColors, Card, Input, Button, SocialIcon, SocialIconProps } from '@rneui/themed';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { Formik, Field, Form } from 'formik';
import { useNavigation } from '@react-navigation/native';



export default function SignupForm() {

    const navigation = useNavigation()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSignup = () => {
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
                        value={firstName}
                        onChangeText={text => setFirstName(text)}
                    />
                    <Text>Last Name</Text>
                    <Input placeholder="Last Name" secureTextEntry={false}
                        onChangeText={text => setLastName(text)}
                        value={lastName}
                    />
                    <Text>Email</Text>
                    <Input placeholder="Email" secureTextEntry={false}
                        onChangeText={text => setEmail(text)}
                        value={email} />
                    <Text>Password</Text>
                    <Input placeholder="Password" secureTextEntry={true}
                        onChangeText={text => setPassword(text)}
                        value={password} />
                    <Text>Repeat Password</Text>
                    <Input placeholder="Repeat Password" secureTextEntry={true} />
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