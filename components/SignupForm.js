import { useState } from 'react';
import { Text, View, Alert } from 'react-native';
import { Card, Input, Button } from '@rneui/themed';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, serverTimestamp, setDoc, doc } from "firebase/firestore";
import { db, auth } from "../config/firebase"
import { useNavigation } from '@react-navigation/native';



export default function SignupForm() {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setPasswordd] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const navigation = useNavigation()

    const handleSignup = async () => {
        try {

            // Create user in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Create document in Firestore with user UID as document ID
            const userData = {
                email: email,
                firstName: firstName,
                lastName: lastName,
                email: email,
                phoneNumber: phoneNumber,
                timeStamp: serverTimestamp(),
                // Add any other user data you want to store in Firestore here
            };
            await setDoc(doc(db, 'Users', user.uid), userData);

            console.log('Success', 'User registered successfully!');
        } catch (error) {
            console.log('Error', error.message);
        }
    };
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
                    <Input placeholder="First Name"
                        secureTextEntry={false}
                        value={lastName}
                        onChangeText={text => setLastName(text)}
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
                        onPress={handleSignup}
                    />
                    <Text style={{ textAlign: 'center' }}>Already have an account? <Text onPress={() => navigation.push('LoginForm')} style={{ color: 'red' }}>LOG IN</Text></Text>
                    <Card.Divider />
                </Card>
            </View>
        </>
    );
}
