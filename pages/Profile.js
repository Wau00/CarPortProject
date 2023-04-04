import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { db, auth } from '../config/firebase';
import { collection, doc, query, where, onSnapshot, getDocs, updateDoc, serverTimestamp } from 'firebase/firestore';
import { Card, Input, Button, } from '@rneui/themed';


const Profile = () => {
    const [data, setData] = useState([]);
    const [newemail, setEmail] = useState('');
    const [newfirstName, setFirstName] = useState('');
    const [newlastName, setLastName] = useState('');
    const [newphoneNumber, setPhoneNumber] = useState('');
    const userAuth = auth.currentUser.uid;


    const handleUpdateInfo = async () => {
        try {

            const userAuth = auth.currentUser.uid;

            // Create document in Firestore with user UID as document ID
            const userData = {
                email: newemail,
                firstName: newfirstName,
                lastName: newlastName,
                phoneNumber: newphoneNumber,
                timeStamp: serverTimestamp(),
                // Add any other user data you want to store in Firestore here
            };
            await updateDoc(doc(db, 'Users', userAuth), userData);

            console.log('Value of an Existing Document Field has been updated');
        } catch (error) {
            console.log('Error', error.message);
        }
    };
    useEffect(() => {
        const userRef = collection(db, 'Users');
        // '__name__',  is a query that filters documents where the document ID is equal to the given value. 
        const q = query(userRef, where('__name__', '==', userAuth));
        const unsubscribe = onSnapshot(q, querySnapshot => {
            setData(
                querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }))
            )
        })
        return unsubscribe;
    }, [])

    return (
        <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
            {data.map((props, index) => (
                <View key={index} style={{ flex: 1 }}>
                    <Card containerStyle={{ backgroundColor: '#f2f2f2', }}>
                        <Card.Title style={{ fontSize: '30px' }}>Profile</Card.Title>
                        <Text>First Name</Text>
                        <Input
                            placeholder={props.firstName}
                            // containerStyle={{ backgroundColor: 'white' }}
                            // placeholderTextColor={"black"}
                            disabledInputStyle={true}
                            secureTextEntry={false}

                            value={newfirstName}
                            onChangeText={text => setFirstName(text)}

                        />
                        <Text>Last Name</Text>
                        <Input placeholder={props.lastName}
                            secureTextEntry={false}
                            value={newlastName}
                            onChangeText={text => setLastName(text)}
                        />
                        <Text>Email</Text>
                        <Input placeholder={props.email}
                            secureTextEntry={false}
                            onChangeText={text => setEmail(text)}
                            value={newemail} />
                        <Text>Phone Number</Text>
                        <Input placeholder={props.phoneNumber}
                            onChangeText={text => setPhoneNumber(text)}
                            value={newphoneNumber} />
                        <Button
                            title="Save changes"
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
                            onPress={handleUpdateInfo}
                        />
                    </Card>
                </View>
            ))}
        </View>
    )
}


export default Profile