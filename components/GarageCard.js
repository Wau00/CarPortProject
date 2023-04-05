import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { collection, doc, query, deleteDoc, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../config/firebase';

const GarageCard = ({ car }) => {
    const [isPromptVisible, setIsPromptVisible] = useState(false);
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
        const carDocRef = doc(carsCollectionRef, carId);
        try {
            await deleteDoc(carDocRef);
            console.log('Car deleted successfully!');
        } catch (error) {
            console.error('Error deleting car:', error);
        }
    };

    const confirmDelete = () => {
        setIsPromptVisible(false);
        deleteCar();
    };

    const showPrompt = () => {
        setIsPromptVisible(true);
        console.log(carId)
    };

    const cancelDelete = () => {
        setIsPromptVisible(false);
    };

    return (
        <View style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}>
            <Text>Make: {car.make}</Text>
            <Text>Model: {car.model}</Text>
            <Text>License Plate: {car.licensePlate}</Text>
            <Text>Color: {car.color}</Text>
            <TouchableOpacity onPress={showPrompt}>
                <Text style={{ color: 'red' }}>Delete</Text>
            </TouchableOpacity>
            {isPromptVisible && (
                <View style={{ marginTop: 10 }}>
                    <Text>Are you sure you want to delete this car?</Text>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <TouchableOpacity onPress={confirmDelete}>
                            <Text style={{ color: 'red', marginRight: 10 }}>Confirm</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={cancelDelete}>
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
};

export default GarageCard;