import { StyleSheet, View, } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, onSnapshot, orderBy, query, querySnapshot, } from "firebase/firestore";
import { db } from '../config/firebase';
import CarCards from '../components/CarCards';
import { Text, Button, } from '@rneui/themed';

const Home = () => {
    const [data, setData] = useState([]);
    const [cars, setCars] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const collectionRef = collection(db, 'vehicles');
        const q = query(collectionRef, orderBy('tagNumber', 'desc'))

        const unsubscribe = onSnapshot(q, querySnapshot => {
            setCars(
                querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    model: doc.data().model,
                    make: doc.data().make,
                    tagNumber: doc.data().tagNumber,
                    licensePlate: doc.data().licensePlate,
                    color: doc.data().color
                }))
            )
        })
        return unsubscribe;


    }, [])



    useEffect(() => {
        const collectionRef = collection(db, 'Users');
        const q = query(collectionRef)

        const unsubscribe = onSnapshot(q, querySnapshot => {
            setData(
                querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    firstName: doc.data().firstName,
                    phoneNumber: doc.data().phoneNumber,
                }))
            )

        })
        return unsubscribe;
    }, [])


    function HomeInfo({ firstName, phoneNumber }) {
        return (
            <Text> Hello {firstName} !</Text>


        )
    }
    console.log(data);




    return (

        <View style={styles.con}>
            {data.map(data => <HomeInfo key={data.id} {...data} />)}
            <Text>{data.firstName}</Text>
            {cars.map(car => <CarCards key={car.id} {...car} />)}
            <Button

                buttonStyle={{
                    backgroundColor: '#EA580C',
                    borderRadius: 5,
                }} title='Add a Car' onPress={() => navigation.navigate('Add')}></Button>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({})

