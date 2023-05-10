import { useState } from 'react';
import { ScrollView, TouchableOpacity, Text, View, StyleSheet, Alert, TextInput, KeyboardAvoidingView } from 'react-native';
import { Card, Input, Button } from '@rneui/themed';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, serverTimestamp, setDoc, doc } from "firebase/firestore";
import { db, auth } from "../config/firebase"
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

export default function SignupForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setPasswordd] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState('');

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

    const evaluatePasswordStrength = (password) => {
        const weakRegex = /^.{0,6}$/;
        const moderateRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
        const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-])[a-zA-Z\d-]{20,}$|^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,}$/;

        if (weakRegex.test(password)) {
            return 'Weak';
        } else if (moderateRegex.test(password)) {
            return 'Moderate';
        } else if (strongRegex.test(password)) {
            return 'Strong';
        } else {
            return 'Invalid';
        }
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
        const strength = evaluatePasswordStrength(text);
        setPasswordStrength(strength);
    };
    const handleSignup = async () => {
        if (firstName && lastName && phoneNumber && email && password && repeatPassword) {
            if (password === repeatPassword) {
                // Validate phone number format
                if (phoneNumber.length !== 15) {
                    Alert.alert('Phone Number Invalid', 'Please enter a 10-digit phone number');
                    return;
                }
                const strength = evaluatePasswordStrength(password);
                if (strength !== 'Strong') {
                    Alert.alert('Weak Password', 'Password must be strong');
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
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView contentContainerStyle={styles.scrollViewContentContainer} >
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
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.subtitle}>Password</Text>
                            <Text style={styles.passwordStrength}>{passwordStrength}</Text>
                        </View>
                        <View style={styles.passwordInputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                onChangeText={(text) => {
                                    setPassword(text);
                                    handlePasswordChange(text);
                                }}
                                value={password}
                                secureTextEntry={!showPassword}
                                returnKeyType="done"
                                onSubmitEditing={() => console.log('Info submitted')}
                            />

                            <TouchableOpacity onPress={toggleShowPassword} style={{ position: "absolute", right: 12, top: 15 }}>
                                <MaterialCommunityIcons
                                    name={showPassword ? 'eye-off' : 'eye'}
                                    size={24}
                                    color="#333"
                                />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.subtitle}>Repeat password</Text>
                        <View style={styles.passwordInputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                onChangeText={(text) => {
                                    setPasswordd(text);
                                }}
                                value={repeatPassword}
                                secureTextEntry={!showPassword}
                                returnKeyType="done"
                                onSubmitEditing={() => console.log('Info submitted')}
                            />

                            <TouchableOpacity onPress={toggleShowPassword} style={{ position: "absolute", right: 12, top: 15 }}>
                                <MaterialCommunityIcons
                                    name={showPassword ? 'eye-off' : 'eye'}
                                    size={24}
                                    color="#333"
                                />
                            </TouchableOpacity>
                        </View>
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
                </ScrollView>
            </KeyboardAvoidingView>

        </>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollViewContentContainer: {
        flexGrow: 1,
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
    passwordInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    passwordInput: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
    },
    passwordIcon: {
        marginRigth: 40,
    },
    passwordStrength: {
        fontSize: 20,
        position: "absolute",
        right: 12,
        top: 6,

    },
    footerTextS: {
        textAlign: 'center',
        textDecorationLine: 'underline',
        color: 'grey',
        fontWeight: '300',
        fontSize: 17,

    },
});
