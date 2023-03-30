import React from "react";
import { Text, View } from 'react-native';
import { Card } from '@rneui/themed';

export default function CarCards({
    id,
    model,
    make,
    tagNumber,
    color,
    licensePlate
}) {
    return (

        <View>
            <View style={{ backgroundColor: '#e8e4e4' }}>
                <Card.Divider />
                <Text> <Text style={{ fontWeight: '800' }}> Make: </Text> {make}</Text>
                <View style={{ flex: 'row' }}>
                    <Card.Divider />
                    <Text> <Text style={{ fontWeight: '800' }}> Model: </Text> {model}</Text>
                    <Card.Divider />
                    <Text> <Text style={{ fontWeight: '800' }}> Tag Number: </Text> {tagNumber}</Text>
                    {/* <Text>{licensePlate}</Text> */}
                    <Card.Divider />
                    <Text> <Text style={{ fontWeight: '800' }}> Color: </Text> {color}</Text>
                </View>
            </View >
        </View>


    )
}






