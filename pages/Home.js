import { StyleSheet, Text, View, Button } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../config/firebase';

const Home = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            let list = []
            try {
                const querySnapshot = await getDocs(collection(db, "users"));
                querySnapshot.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() })
                });
                setData(list)
                console.log(list);
            } catch (err) {
                console.log(err)
            }

        }
        fetchData();

    }, [])

    // console.log(data);


    const navigation = useNavigation();
    return (


        <Button title='Add a Car' onPress={() => navigation.navigate('Add')}></Button>
    )
}











export default Home

const styles = StyleSheet.create({})

