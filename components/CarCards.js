import React from "react";
import { Text, View, Alert } from 'react-native';
import { Card, Input, Button, } from '@rneui/themed';
import { db } from "../config/firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";



export default function CarCards({
    id,
    model,
    make,
    tagNumber,
    color,
    licensePlate
}) {
    return (

        <Card>
            <Button>---------------------------------</Button>
            <View>
                <Text>{model}</Text>
                <Text>{make}</Text>
                <Text>{tagNumber}</Text>
                <Text>{licensePlate}</Text>
                <Text>{color}</Text>
            </View>
            <Button>---------------------------------</Button>

        </Card>


    )
}





