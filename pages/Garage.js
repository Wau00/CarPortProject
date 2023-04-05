import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text } from 'react-native';
import GarageCard from '../components/GarageCard';
import { collection, doc, query, where, onSnapshot, getDocs } from 'firebase/firestore';
import { db, auth } from '../config/firebase';

const Garage = () => {
    const [cars, setCars] = useState([]);
    const userAuth = auth.currentUser.uid;

    useEffect(() => {
        const usersCollectionRef = collection(db, 'Users');
        const userDocRef = doc(usersCollectionRef, userAuth);
        const carsCollectionRef = collection(userDocRef, 'cars');
        const q = query(carsCollectionRef);
        const unsubscribe = onSnapshot(q, querySnapshot => {
            setCars(
                querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }))
            )
        })
        return unsubscribe;
    }, []);

    console.log(cars);
    return (
        <View>
            {cars.map(car => (
                <GarageCard key={car.id} car={car} />
            ))}
        </View>
    );
};

export default Garage