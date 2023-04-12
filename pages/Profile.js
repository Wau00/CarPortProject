import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import { db, auth } from '../config/firebase';
import { collection, doc, query, where, onSnapshot, getDocs, updateDoc, serverTimestamp } from 'firebase/firestore';
import { Card, Input, Button, } from '@rneui/themed';
import ProfileCards from '../components/ProfileCards';


const Profile = () => {
    const [data, setData] = useState([]);
    const [newfirstName, setFirstName] = useState('');
    const [newlastName, setLastName] = useState('');
    const [newphoneNumber, setPhoneNumber] = useState('');
    const [editing, setEditing] = useState(false);
    const userAuth = auth.currentUser.uid;

    useEffect(() => {
        const userRef = collection(db, 'Users');
        // '__name__',  is a query that filters documents where the document ID is equal to the given value. 
        const q = query(userRef, where('__name__', '==', userAuth));
        const unsubscribe = onSnapshot(q, querySnapshot => {
            setData(
                querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
            )
        })
        return unsubscribe;
    }, [])

    useEffect(() => {
        setEditing(false);
        return () => setEditing(true);

    }, []);

    const handleEditPress = () => {
        setEditing(true);
    };

    const cancelEditPress = () => {
        setEditing(false);
    };

    const handleSavePress = async () => {
        const userAuth = auth.currentUser.uid;

        if (!newfirstName || !newlastName || !newphoneNumber) {
            Alert.alert("Please complete all fields");
            return;
        }

        if (newphoneNumber.length !== 15) {
            Alert.alert('Phone Number Invalid', 'Please enter a 10-digit phone number');
            return;
        }

        try {
            const userData = {
                firstName: newfirstName,
                lastName: newlastName,
                phoneNumber: newphoneNumber,
                timeStamp: serverTimestamp(),
            };

            const userDocRef = doc(db, 'Users', userAuth);
            await updateDoc(userDocRef, userData);
            console.log('User data has been updated:', userData);
            setEditing(false);
        } catch (error) {
            console.log('Error updating user data:', error);
        }
    };
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
    return (
        <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
            {editing ? (
                <View style={styles.container}>
                    <View style={styles.subcontainer}>
                        <Text style={styles.title}>Profile</Text>
                        <Text style={styles.subtitle}>First name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter first name"
                            value={newfirstName}
                            onChangeText={text => setFirstName(text)}
                            returnKeyType="done"
                            onSubmitEditing={() => console.log('Info submitted')}
                        />
                        <Text style={styles.subtitle}>Last name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter last name"
                            value={newlastName}
                            onChangeText={text => setLastName(text)}
                            returnKeyType="done"
                            onSubmitEditing={() => console.log('Info submitted')}
                        />
                        <Text style={styles.subtitle}>Phone number</Text>
                        <TextInput
                            keyboardType="number-pad"
                            returnKeyType="done"
                            onSubmitEditing={() => console.log('Phone number submitted')}
                            style={styles.input}
                            placeholder="Enter phone number"
                            onChangeText={(text) => setPhoneNumber(formatPhoneNumber(text))}
                            value={newphoneNumber}
                        />
                        <Button
                            buttonStyle={styles.buttonStyle}
                            title="Save changes"
                            onPress={handleSavePress}
                        />
                    </View>
                    <TouchableOpacity onPress={cancelEditPress} style={styles.cancelButton}>
                        <Text style={styles.cancelButtonText}>X</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.container}>
                    {data.map(data => <ProfileCards key={data.id} {...data} />)}
                    <View>
                        <Button
                            buttonStyle={styles.buttonStyle}
                            title="Edit"
                            onPress={handleEditPress}
                        />
                    </View>
                </View>

            )
            }
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 30,
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
        fontSize: 20,
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
    cancelButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        width: 30,
        height: 30,
        borderRadius: 50,
        backgroundColor: '#EA580C',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelButtonText: {
        fontSize: 16,
        color: 'white',
    },
});

export default Profile