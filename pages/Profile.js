import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, TextInput, Alert } from 'react-native';
import { db, auth } from '../config/firebase';
import { collection, doc, query, where, onSnapshot, getDocs, updateDoc, serverTimestamp } from 'firebase/firestore';
import { Card, Input, Button, } from '@rneui/themed';
import ProfileCards from '../components/ProfileCards';


const Profile = () => {
    const [data, setData] = useState([]);
    const [newfirstName, setFirstName] = useState('');
    const [newlastName, setLastName] = useState('');
    const [newphoneNumber, setPhoneNumber] = useState('');
    const userAuth = auth.currentUser.uid;



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
    const [editing, setEditing] = useState(false);

    const handleEditPress = () => {
        setEditing(true);
    };
    const cancelEditPress = () => {
        setEditing(false);
    };

    const handleSavePress = async () => {
        const userAuth = auth.currentUser.uid;
        if (newfirstName && newlastName && newphoneNumber) {
            try {
                // Update document in Firestore with user UID as document ID
                const userData = {
                    firstName: newfirstName,
                    lastName: newlastName,
                    phoneNumber: newphoneNumber,
                    timeStamp: serverTimestamp(),
                    // Add any other user data you want to store in Firestore here
                };
                await updateDoc(doc(db, 'Users', userAuth), userData);
                console.log('Value of an Existing Document Field has been updated');
                setEditing(false);
            } catch (error) {
                console.log('Error', error.message);
            }
        } else {
            Alert.alert("Please complete all fields");
        }
    };

    return (
        <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>

            {editing ? (

                <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
                    <View style={{ flex: 1 }}>
                        <Card containerStyle={{ backgroundColor: '#f2f2f2', }}>
                            <Card.Title style={{ fontSize: '30px' }}>Profile</Card.Title>
                            <Text>First Name</Text>
                            <Input
                                placeholder={data.firstName}
                                // containerStyle={{ backgroundColor: 'white' }}
                                // placeholderTextColor={"black"}
                                disabledInputStyle={true}
                                secureTextEntry={false}

                                value={newfirstName}
                                onChangeText={text => setFirstName(text)}

                            />
                            <Text>Last Name</Text>
                            <Input placeholder={data.lastName}
                                secureTextEntry={false}
                                value={newlastName}
                                onChangeText={text => setLastName(text)}
                            />
                            <Text>Phone Number</Text>
                            <Input
                                placeholder={data.phoneNumber}
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
                                onPress={handleSavePress}
                            />
                            <Button
                                title="Cancel"
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
                                onPress={cancelEditPress}
                            />
                        </Card>
                    </View>
                </View>
            ) : (
                // <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
                //     <View style={{ flex: 1 }}>
                //         <Card containerStyle={{ backgroundColor: '#f2f2f2', }}>
                //             {data.map(data => <ProfileCards key={data.id} {...data} />)}
                //             < Button
                //                 title="Edit"
                //                 loading={false}
                //                 loadingProps={{ size: 'small', color: '#171717' }}
                //                 buttonStyle={{
                //                     backgroundColor: '#EA580C',
                //                     borderRadius: 5,
                //                 }}
                //                 titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
                //                 containerStyle={{
                //                     marginHorizontal: 50,
                //                     height: 50,
                //                     width: 200,
                //                     marginVertical: 10,
                //                 }}
                //                 onPress={handleEditPress}
                //             />
                //         </Card>

                //     </View>
                // </View>
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

export default Profile