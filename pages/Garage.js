import React, { useState, useEffect } from 'react'
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import GarageCard from '../components/GarageCard';
import { collection, doc, query, where, onSnapshot, getDocs } from 'firebase/firestore';
import { db, auth } from '../config/firebase';
import { useNavigation } from '@react-navigation/core';
import { Button } from '@rneui/themed';

const Garage = () => {
    const [cars, setCars] = useState([]);
    const userAuth = auth.currentUser.uid;
    const navigation = useNavigation();

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
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Garage</Text>

                {cars.length > 0 ? (
                    <>
                        <Button
                            buttonStyle={styles.buttonStyle}
                            title="Add a Car"
                            onPress={() => navigation.navigate('Add')}
                        />
                        {cars.map((car) => <GarageCard key={car.id} car={car} />)}
                    </>
                ) : (
                    <View style={styles.container}>
                        <Text style={styles.text}>Let's start by adding a car!</Text>
                        <Button
                            buttonStyle={styles.buttonStyle}
                            title="Add a Car"
                            onPress={() => navigation.navigate('Add')}
                        />
                    </View>
                )}
            </View>

        </ScrollView>
    );
};

export default Garage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 30,
        textAlign: 'left'
    },
    title: {
        fontSize: 40,
        fontWeight: '400',
        marginBottom: 20,
    },
    text: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    buttonStyle: {
        backgroundColor: '#EA580C',
        borderRadius: 5,
        margin: 15,
    },
});