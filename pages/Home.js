import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { collection, doc, query, where, onSnapshot, getDocs } from 'firebase/firestore';
import { Text, Button, ButtonGroup } from '@rneui/themed';
import { db, auth } from '../config/firebase';
import CarCards from '../components/CarCards';
import TabCars from '../components/TabCars';


const Home = () => {
    const [data, setData] = useState([]);
    const [cars, setCars] = useState([]);
    const userAuth = auth.currentUser.uid;
    const navigation = useNavigation();

    const [buttonTitles, setButtonTitles] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);

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
                <View style={{}}>
                    <Text style={{ fontWeight: '300', fontSize: '14' }}> Welcome back </Text>
                    <Text style={{ fontWeight: '500', fontSize: '17' }}> {firstName} {lastName}</Text>
                </View>
            </>
        )
    }

    // function ButtonsAssign() {
    //     return (
    //         <>
    //             <ButtonGroup
    //                 onPress={(value) => {
    //                     setSelectedIndex(value);

    //                 }}
    //                 selectedIndex={selectedIndex}
    //                 buttons={buttonTitles}
    //                 containerStyle={{ height: 50 }}

    //             />
    //         </>
    //     )
    // }
    return (
        <View style={{ flex: 1, padding: 20, }}>
            {data.map(data => <HomeInfo key={data.id} {...data} />)}
            <Text>{data.firstName}</Text>
            <Text style={{ fontSize: '25', fontWeight: '700' }}> Select your car </Text>
            <TabCars />
            {/* {cars.map(car => <CarCards key={car.id} {...car} />)} */}
            <Button
                buttonStyle={{
                    backgroundColor: '#EA580C',
                    borderRadius: 5,
                    margin: 15,
                }} title='Add a Car' onPress={() => navigation.navigate('Add')}></Button>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({})

