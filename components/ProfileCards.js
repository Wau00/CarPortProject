import React, { useState } from 'react'
import { Text, View } from 'react-native';
import { Card } from '@rneui/themed'


export default function ProfileCards({
    firstName, lastName, phoneNumber,
}) {

    return (


        <View containerStyle={{ backgroundColor: '#f2f2f2', }}>
            <Card.Title style={{ fontSize: '30px' }}>Profile</Card.Title>
            <Text>{firstName}</Text>
            <Text>{lastName}</Text>
            <Text>{phoneNumber}</Text>
        </View>




    )

}