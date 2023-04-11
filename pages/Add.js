
import { View, Text, StyleSheet, Select, Alert, TextInput } from "react-native"
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

            <View style={styles.subcontainer}>
                <Text style={styles.title}>Add Car +</Text>
                <Text style={styles.subtitle}>Tag number</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Tag Number" keyboardType="number-pad"
                    onChangeText={text => setTagNumber(text)}
                    value={tagNumber}
                />
                <Text style={styles.subtitle}>Make</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Make"
                    secureTextEntry={false}
                    onChangeText={text => setMake(text)}
                    value={make}
                />
                <Text style={styles.subtitle}>Model</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Model" secureTextEntry={false}
                    onChangeText={text => setModel(text)}
                    value={model}
                />
                <Text style={styles.subtitle}>Color</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Color" secureTextEntry={false}
                    onChangeText={text => setColor(text)}
                    value={color}
                />
                <Text style={styles.subtitle}>License plate</Text>
                <TextInput
                    style={styles.input}
                    placeholder="License Plate" secureTextEntry={false}
                    onChangeText={text => setLicensePlate(text)}
                    value={licensePlate}
                />
                <View>
                    <Button
                        buttonStyle={styles.buttonStyle}
                        title="Add car"
                        onPress={addCar}
                    />
                </View>
            </View>
        </View>

    )
}

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
        width: '100%',
        height: 50,
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
});