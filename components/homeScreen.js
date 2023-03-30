import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../config/firebase';
import auth from '@react-native-firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';




const homeScreen = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            let list = []
            try {
                const querySnapshot = await getDocs(collection(db, "users"));
                querySnapshot.forEach((doc) => {
                    list.push(doc)
                });
                setData(list)
            } catch (err) {
                console.log(err)
            }

        }
        fetchData();
    }, [])

    
    return (
        <View>
            <Text>Hello There!!!</Text>
        </View>
    )
}

export default homeScreen

const styles = StyleSheet.create({})