import { StyleSheet, Text, View } from 'react-native'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigation } from '@react-navigation/core'
import React from 'react'

const Home = () => {

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            return (
                <View>
                    <Text>Home</Text>
                </View>
            )
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            // ...Mai
        } else {
            // User is signed out
            // ...
        }
    });









}

export default Home

const styles = StyleSheet.create({})

