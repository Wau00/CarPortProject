import { StyleSheet, Text, View } from 'react-native'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigation } from '@react-navigation/core'
import React from 'react'

const Home = () => {

    const navigation = useNavigation();
    return (

        <Text>
            Hello World
        </Text>
    )
}











export default Home

const styles = StyleSheet.create({})

