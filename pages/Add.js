
import { View, Text, StyleSheet, TextInput } from "react-native"
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Card, Input, Button } from '@rneui/themed';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../config/firebase"



export default function Add() {
    const navigation = useNavigation();
    const [tagNumber, setTagNumber] = useState('');
    const [licensePlate, setLicensePlate] = useState('');
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [color, setColor] = useState('');


    const addCar = async () => {

        if (tagNumber !== "" && licensePlate !== "" && make !== "" && model !== "" && color !== "") {
            if (tagNumber != int) {
                window.alert("Please enter a Valid Tag Number")
            }
            await addDoc(collection(db, "vehicles"), {
                color: color,
                licensePlate: licensePlate,
                make: make,
                model: model,
                tagNumber: tagNumber,
                timeStamp: serverTimestamp(),

            }).then(() => console.log('Data Submitted!'))
                .catch((err) => alert(err))

            navigation.goBack();
        } else {
            window.alert("Please complete all fields")
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