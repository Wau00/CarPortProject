import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, TextInput } from 'react-native';
import { collection, doc, query, deleteDoc, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../config/firebase';
import { Button } from '@rneui/base';

const GarageCard = ({ car }) => {
    const [isPromptVisible, setIsPromptVisible] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [carId, setCarId] = useState("");
    const userAuth = auth.currentUser.uid;


    useEffect(() => {
        const usersCollectionRef = collection(db, 'Users');
        const userDocRef = doc(usersCollectionRef, userAuth);
        const carsCollectionRef = collection(userDocRef, 'cars');
        const q = query(carsCollectionRef);
        const unsubscribe = onSnapshot(q, querySnapshot => {
            setCarId(querySnapshot.docs[0].id)
        })
        return unsubscribe;
    }, []);



    const deleteCar = async () => {
        const usersCollectionRef = collection(db, 'Users');
        const userDocRef = doc(usersCollectionRef, userAuth);
        const carsCollectionRef = collection(userDocRef, 'cars');
        const carDocRef = doc(carsCollectionRef, car.id);

        const unsubscribe = onSnapshot(carDocRef, async (doc) => {
            if (doc.exists()) {
                try {
                    await deleteDoc(carDocRef);
                    console.log('Car deleted successfully!');
                    Alert.alert("Deleted Successfully");
                } catch (error) {
                    console.error('Error deleting car:', error);
                }
            }
        });

        return unsubscribe;
    };

    const confirmDelete = () => {
        setIsPromptVisible(false);
        deleteCar();
    };

    const showPrompt = () => {
        setIsPromptVisible(true);
    };

    const cancelDelete = () => {
        setIsPromptVisible(false);
    };
    const toggleDetails = () => {
        setShowDetails(!showDetails);
    }

    return (
        <View style={{ borderWidth: 1, borderColor: '#A3A3A3', padding: 10, marginBottom: 10, flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.square}></View>
                        <Text style={styles.header}>{car.make}</Text>
                    </View>
                    <TouchableOpacity onPress={toggleDetails}>
                        <Text style={{ color: '#737373', marginRight: 10 }}>
                            {showDetails ? 'Hide -' : 'Details +'}
                        </Text>
                    </TouchableOpacity>
                </View>
                {showDetails && (
                    <View>
                        <View style={styles.subcontainer}>
                            <Text style={styles.subtitle}>Model</Text>
                            <Text style={styles.input}>{car.model}</Text>
                            <Text style={styles.subtitle}>Make</Text>
                            <Text style={styles.input}>{car.make}</Text>
                            <Text style={styles.subtitle}>Color</Text>
                            <Text style={styles.input}>{car.color}</Text>
                            <Text style={styles.subtitle}>Tag number</Text>
                            <Text style={styles.input}>{car.tagNumber}</Text>
                            <Text style={styles.subtitle}>License plate</Text>
                            <Text style={styles.input}>{car.licensePlate}</Text>
                        </View>
                        <View style={{ alignItems: 'center', marginTop: 10 }}>
                            <Button
                                buttonStyle={styles.buttonStyle}
                                title="Delete"
                                onPress={showPrompt}
                            />
                        </View>
                    </View>
                )}
            </View>
            {isPromptVisible && (
                Alert.alert(
                    'Delete Car',
                    'Are you sure you want to delete this car?',
                    [
                        {
                            text: 'Cancel',
                            style: 'cancel',
                            onPress: cancelDelete,
                        },
                        {
                            text: 'Confirm',
                            onPress: confirmDelete,
                            style: 'destructive',
                        },
                    ],
                    { cancelable: true }
                )
            )}
        </View>

    );
};

const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
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
    header: {
        fontSize: 20,
        fontWeight: '500',
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
        width: '110%',
        height: 50,
        fontSize: 20,
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
    square: {
        backgroundColor: randomColor,
        width: 20,
        height: 20,
        marginRight: 10
    },
});
export default GarageCard;