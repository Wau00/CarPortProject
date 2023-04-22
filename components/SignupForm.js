import { useState } from 'react';
import { Text, View, StyleSheet, Alert, TextInput } from 'react-native';
import { Card, Input, Button } from '@rneui/themed';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, serverTimestamp, setDoc, doc } from "firebase/firestore";
import { db, auth } from "../config/firebase"
import { useNavigation } from '@react-navigation/native';
import { Value } from 'react-native-reanimated';

export default function SignupForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setPasswordd] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigation = useNavigation()


    const formatPhoneNumber = (text) => {
        // Remove all non-digits from the input
        let cleaned = text.replace(/\D/g, '');

        // Apply formatting based on the length of the cleaned number
        if (cleaned.length < 4) {
            return ` (${cleaned}`;
        } else if (cleaned.length < 7) {
            return ` (${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
        } else {
            return ` (${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
        }
    };


    const handleSignup = async () => {
        if (firstName && lastName && phoneNumber && email && password && repeatPassword) {
            if (password === repeatPassword) {
                // Validate phone number format
                if (phoneNumber.length !== 15) {
                    Alert.alert('Phone Number Invalid', 'Please enter a 10-digit phone number');
                    return;
                }
                try {
                    // Create user in Firebase Authentication
                    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                    const user = userCredential.user;

                    // Create document in Firestore with user UID as document ID
                    const userData = {
                        email: email,
                        firstName: firstName,
                        lastName: lastName,
                        password: password,
                        phoneNumber: phoneNumber,
                        timeStamp: serverTimestamp(),
                        // Add any other user data you want to store in Firestore here
                    };
                    await setDoc(doc(db, 'Users', user.uid), userData);
                    console.log('Success', 'User registered successfully!');
                } catch (error) {
                    Alert.alert('Error', error.message);
                }
            } else {
                Alert.alert('Password Must Match');
            }
        } else {
            Alert.alert('You must complete all the fields');
        }





    };

    console.log(phoneNumber); 4696622739

    return (
        <>
            <View style={styles.container}>
                <View style={styles.subcontainer}>
                    <Text style={styles.title}>Sign up</Text>
                    <Text style={styles.subtitle}>First name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="First name"
                        onChangeText={text => setFirstName(text)}
                        value={firstName}
                        returnKeyType="done"
                        onSubmitEditing={() => console.log('Info submitted')}
                    />
                    <Text style={styles.subtitle}>Last name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Last name"
                        onChangeText={text => setLastName(text)}
                        value={lastName}
                        returnKeyType="done"
                        onSubmitEditing={() => console.log('Info submitted')}
                    />
                    <Text style={styles.subtitle}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="mail@carport.com"
                        onChangeText={text => setEmail(text)}
                        value={email}
                        keyboardType="email-address"
                        returnKeyType="done"
                        onSubmitEditing={() => console.log('Info submitted')}
                    />
                    <Text style={styles.subtitle}>Phone Number</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="(000) 000-0000"
                        keyboardType="phone-pad"
                        returnKeyType="done"
                        onSubmitEditing={() => console.log('Phone number submitted')}
                        onChangeText={(text) => setPhoneNumber(formatPhoneNumber(text))}
                        value={phoneNumber}
                    />
                    <Text style={styles.subtitle}>Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        onChangeText={text => setPassword(text)}
                        value={password}
                        secureTextEntry
                        returnKeyType="done"
                        onSubmitEditing={() => console.log('Info submitted')}
                    />
                    <Text style={styles.subtitle}>Repeat password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        onChangeText={text => setPasswordd(text)}
                        value={repeatPassword}
                        secureTextEntry
                        returnKeyType="done"
                        onSubmitEditing={() => console.log('Info submitted')}
                    />
                    <View>
                        <Button
                            buttonStyle={styles.buttonStyle}
                            title="Sign up"
                            onPress={handleSignup}
                        />
                    </View>
                    <Text style={styles.footerText}>Already have an account? </Text>
                    <Text onPress={() => navigation.push('Login')} style={styles.footerTextS}>Sign in</Text>
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
