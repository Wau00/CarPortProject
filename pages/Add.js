
import { View, Text, StyleSheet, Select, Alert, } from "react-native"
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Card, Input, Button } from '@rneui/themed';
import { collection, addDoc, serverTimestamp, setDoc, doc, where } from "firebase/firestore";
import { db, auth } from "../config/firebase"



export default function Add() {
    const navigation = useNavigation();
    const [tagNumber, setTagNumber] = useState('');
    const [licensePlate, setLicensePlate] = useState('');
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [color, setColor] = useState('');
    const userAuth = auth.currentUser.uid;


    const addCar = async () => {
        const parentCollectionRef = collection(db, 'Users');
        const userDocRef = doc(parentCollectionRef, userAuth);
        const carsCollectionRef = collection(userDocRef, 'cars');
        const carData = {
            useridReference: userAuth,
            color: color,
            licensePlate: licensePlate,
            make: make,
            model: model,
            tagNumber: tagNumber,
            timeStamp: serverTimestamp(),
        };
        try {
            // Only evaluates to true if all fields have a non-empty value
            if (tagNumber && licensePlate && make && model && color) {
                if (tagNumber.length === 6) { // checks if tagNumber is a 6 digits string
                    await addDoc(carsCollectionRef, carData);
                    navigation.goBack();
                } else {
                    Alert.alert("Please enter a valid Tag Number");
                }
            } else {
                Alert.alert("Please complete all fields");
            }
        } catch (error) {
            console.log('Error', error.message);
        }
    }

    return (
        <View style={styles.container}>
            <Input
                placeholder="Tag Number" keyboardType="number-pad"
                onChangeText={text => setTagNumber(text)}
                value={tagNumber} />
            <Input placeholder="Make" secureTextEntry={false}
                onChangeText={text => setMake(text)}
                value={make} />
            <Input placeholder="Model" secureTextEntry={false}
                onChangeText={text => setModel(text)}
                value={model} />
            <Input placeholder="Color" secureTextEntry={false}
                onChangeText={text => setColor(text)}
                value={color} />
            <Input placeholder="License Plate" secureTextEntry={false}
                onChangeText={text => setLicensePlate(text)}
                value={licensePlate} />
            <Button onPress={addCar}>Add Car +</Button>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffff',
        alignItems: 'center',
    }
})