import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { collection, doc, query, where, onSnapshot } from 'firebase/firestore';
import { Text, Button } from '@rneui/themed';
import { db, auth } from '../config/firebase';
import TabCars from '../components/TabCars';

const Home = () => {
    const [data, setData] = useState([]);
    const [cars, setCars] = useState([]);
    const userAuth = auth.currentUser.uid;
    const navigation = useNavigation();

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




    function HomeInfo({ firstName, phoneNumber, lastName }) {
        return (
            <>

                <View style={styles.subcontainer}>
                    <Text style={{ fontWeight: '300', fontSize: '18' }}> Welcome back </Text>
                    <Text style={styles.title}> {firstName} {lastName}</Text>
                </View>

            </>
        )
    }

    return (
        <View style={styles.container}>
            {data.map(data => <HomeInfo key={data.id} {...data} />)}
            <Text>{data.firstName}</Text>
            <TabCars />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,

    },
    subcontainer: {
        textAlign: 'left'
    },
    title: {
        fontSize: 40,
        fontWeight: '400',
        marginBottom: 20,
    },
    promptText: {
        marginVertical: 20,
        fontSize: '25',
        fontWeight: '700'
    },
    buttonStyle: {
        backgroundColor: '#EA580C',
        borderRadius: 5,
        margin: 15,
    },
    innerContainer: {
        position: 'absolute',
        top: 200,
        left: 10,
        right: 0,
        bottom: '10%', // Displays only 70% of the container height
        backgroundColor: '#fff',
    }




})

