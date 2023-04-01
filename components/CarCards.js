import React, { useState } from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { Card, Button } from '@rneui/themed'

export default function CarCards({
    id,
    model,
    make,
    tagNumber,
    color,
    licensePlate
}) {
    return (
        <>
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
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
});





