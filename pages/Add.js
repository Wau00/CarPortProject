
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput, Modal } from "react-native"
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Card, Input, Button } from '@rneui/themed';
import { collection, addDoc, serverTimestamp, setDoc, doc, where } from "firebase/firestore";
import { db, auth } from "../config/firebase"
import axios from "axios";
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';



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
    ///////////////////////////////////////
    ///////////////////////////////////////
    const [carMakes, setCarMakes] = useState([]);
    const [selectedMake, setSelectedMake] = useState('');
    const [carModels, setCarModels] = useState([]);
    const [selectedModel, setSelectedModel] = useState('');
    const [showMakesPicker, setShowMakesPicker] = useState(false);
    const [showModelsPicker, setShowModelsPicker] = useState(false);

    useEffect(() => {
        axios.get('https://www.carqueryapi.com/api/0.3/?cmd=getMakes').then((response) => {
            setCarMakes(response.data.Makes);
        });
    }, []);

    const handleMakeChange = (value) => {
        const capitalizedMake = value.charAt(0).toUpperCase() + value.slice(1);
        setSelectedMake(value);
        setMake(capitalizedMake);
        axios.get(`https://www.carqueryapi.com/api/0.3/?cmd=getModels&make=${value}`).then((response) => {
            setCarModels(response.data.Models);
        });
    };

    const handleModelChange = (value) => {
        setSelectedModel(value);
        setModel(value);
    };

    ///////////////////////////////////////
    ///////////////////////////////////////

    console.log(make);
    console.log(model);
    return (
        <View style={styles.container}>
            <View style={styles.subcontainer}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showMakesPicker}
                    onRequestClose={() => setShowMakesPicker(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modal}>
                            <Button buttonStyle={{ backgroundColor: '#EA580C' }} title="Close" onPress={() => setShowMakesPicker(false)} />
                            <Picker selectedValue={selectedMake} onValueChange={handleMakeChange}>
                                <Picker.Item label="Select make" value="" />
                                {carMakes.map((make) => (
                                    <Picker.Item label={make.make_display} value={make.make_id} key={make.make_id} />
                                ))}
                            </Picker>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showModelsPicker}
                    onRequestClose={() => setShowModelsPicker(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modal}>
                            <Button title="Close" buttonStyle={{ backgroundColor: '#EA580C' }} onPress={() => setShowModelsPicker(false)} />
                            <Picker selectedValue={selectedModel} onValueChange={handleModelChange}>
                                <Picker.Item label="Select model" value="" />
                                {carModels && Array.isArray(carModels) && carModels.map((model) => (
                                    <Picker.Item label={model.model_name} value={model.model_name} key={model.model_name} />
                                ))}
                            </Picker>
                        </View>
                    </View>
                </Modal>
                <Text style={styles.title}>Add Car +</Text>
                <Text style={styles.subtitle}>Tag number</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Tag Number"
                    onChangeText={text => setTagNumber(text.substring(0, 6))}
                    value={tagNumber}
                    keyboardType="number-pad"
                    returnKeyType="done"
                    onSubmitEditing={() => console.log('Tag number submitted')}
                />
                <Text style={styles.subtitle}>Make</Text>
                <TouchableOpacity onPress={() => { setShowMakesPicker(true); setMake(selectedMake.charAt(0).toUpperCase() + selectedMake.slice(1)); }}>
                    <Text style={styles.input} >{selectedMake ? selectedMake.charAt(0).toUpperCase() + selectedMake.slice(1) : "Select make"}</Text>
                    <Icon style={{ position: "absolute", right: 1, marginVertical: 10 }} name="keyboard-arrow-down" size={30} color="#000" />
                </TouchableOpacity>
                <Text style={styles.subtitle}>Model</Text>
                <TouchableOpacity onPress={() => { setShowModelsPicker(true); setModel(selectedModel); }}>
                    <Text style={styles.input} >{selectedModel || "Select model"}</Text>
                    <Icon style={{ position: "absolute", right: 12, top: 15, marginVertical: 10 }} name="keyboard-arrow-down" size={30} color="#000" />
                </TouchableOpacity>
                <Text style={styles.subtitle}>Color</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Color" secureTextEntry={false}
                    onChangeText={text => setColor(text)}
                    value={color}
                    returnKeyType="done"
                    onSubmitEditing={() => console.log('Info submitted')}
                />
                <Text style={styles.subtitle}>License plate</Text>
                <TextInput
                    style={styles.input}
                    placeholder="License Plate" secureTextEntry={false}
                    onChangeText={text => setLicensePlate(text)}
                    value={licensePlate}
                    returnKeyType="done"
                    onSubmitEditing={() => console.log('Info submitted')}
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
    modal: {
        height: '33%',
        width: '100%',
        backgroundColor: '#fff',
        padding: 20,
    },
    modalContainer: {
        flex: 1,
        height: '33%',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalContent: {
        width: '100%',
    }
});