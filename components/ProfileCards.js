import React, { useState } from 'react'
import { Text, View, StyleSheet, Tab, TabView } from 'react-native';
import { Card, Button } from '@rneui/themed'


export default function ProfileCards({
    firstName, lastName, phoneNumber,
}) {

    return (
        <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
            <View style={{ flex: 1 }}>
                <Card containerStyle={{ backgroundColor: '#f2f2f2', }}>
                    <Card.Title style={{ fontSize: '30px' }}>Profile</Card.Title>
                    <Text>{firstName}</Text>
                    <Text>{lastName}</Text>
                    <Text>{phoneNumber}</Text>
                </Card>
            </View>
        </View>


    )

}