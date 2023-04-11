import React, { useState } from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { Button } from '@rneui/themed'


export default function ProfileCards({
    firstName, lastName, phoneNumber,
}) {

    return (
        <View style={styles.subcontainer}>
            <Text style={styles.title}>Profile</Text>
            <Text style={styles.subtitle}>First name</Text>
            <Text style={styles.input}>{firstName}</Text>
            <Text style={styles.subtitle}>Last name</Text>
            <Text style={styles.input}>{lastName}</Text>
            <Text style={styles.subtitle}>Phone number</Text>
            <Text style={styles.input}>{phoneNumber}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    
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
        fontSize: 20,
        padding: 10,
        backgroundColor: 'white',
    },
});