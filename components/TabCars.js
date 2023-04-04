import React, { useEffect, useState } from 'react';
import { Tab, Text, TabView, Card } from '@rneui/themed';
import { View, ActivityIndicator, StyleSheet, ImageBackground, } from 'react-native';
import { collection, doc, query, where, onSnapshot, getDocs } from 'firebase/firestore';
import PagerView from 'react-native-pager-view';
import { db, auth } from '../config/firebase';
import CarCards from './CarCards';
const backgroundImage = require('../assets/background.png');



export default function TabCars() {
    const [index, setIndex] = React.useState(0);
    const [cars, setCars] = useState([]);
    const [buttonTitles, setButtonTitles] = useState([]);
    const userAuth = auth.currentUser.uid;
    useEffect(() => {
        const usersCollectionRef = collection(db, 'Users');
        const userDocRef = doc(usersCollectionRef, userAuth);
        const carsCollectionRef = collection(userDocRef, 'cars');
        const unsubscribe = onSnapshot(carsCollectionRef, (querySnapshot) => {
            const buttonTitles = querySnapshot.docs.map((doc) => doc.data().make);
            setButtonTitles(buttonTitles);
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        const usersCollectionRef = collection(db, 'Users');
        const userDocRef = doc(usersCollectionRef, userAuth);
        const carsCollectionRef = collection(userDocRef, 'cars');

        const q = query(carsCollectionRef);
        const unsubscribe = onSnapshot(q, querySnapshot => {
            setCars(
                querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }))
            )
        })
        return unsubscribe;
    }, []);

    return (
        <>
            <Tab
                value={index}
                onChange={(e) => setIndex(e)}
                indicatorStyle={{
                    backgroundColor: '#737373',
                    height: 1,
                    padding: 4,
                }}
                style={styles.tabStyle}
            >
                {buttonTitles.map((title, index) => (
                    <Tab.Item
                        key={index}
                        title={title}
                        titleStyle={styles.button}
                    // icon={{ name: 'timer', type: 'ionicon', color: 'white' }}
                    />
                ))}
            </Tab >
            <TabView value={index} onChange={setIndex} animationType="spring" >
                {cars.map((props, index) => (
                    <TabView.Item key={index} style={styles.card}>
                        <PagerView style={styles.pagerView} initialPage={0}>
                            <ImageBackground style={styles.image}
                                source={backgroundImage}>
                                <View style={styles.container}>
                                    <View style={styles.row}>
                                        <View style={styles.column}>
                                            <Text style={styles.textSec}>Model</Text>
                                        </View>
                                        <View style={styles.column}>
                                            <Text style={styles.textSec}>Tag Number</Text>
                                        </View>
                                        <View style={styles.column}>
                                            <Text style={styles.textSec}>Color</Text>
                                        </View>
                                    </View>
                                    <View style={styles.row}>
                                        <View style={styles.column}>
                                            <Text style={styles.text}>{props.model}</Text>
                                        </View>
                                        <View style={styles.column}>
                                            <Text style={styles.text}>{props.tagNumber}</Text>
                                        </View>
                                        <View style={styles.column}>
                                            <Text style={styles.text}>{props.color}</Text>
                                        </View>
                                    </View>
                                </View>
                            </ImageBackground>
                        </PagerView>
                    </TabView.Item>
                ))}
            </TabView >
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    tabStyle: {
        backgroundColor: '#D4D4D4',
        marginVertical: 10,
        padding: 20,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    pagerView: {
        flex: 1,
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    tabView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    row: {
        flexDirection: 'row',
    },
    column: {
        flex: 1,
        margin: 1,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textSec: {
        marginVertical: 1,
        fontSize: 18,
        color: '#333',
    },
    text: {
        marginVertical: 1,
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
    button: {
        color: 'white',
        backgroundColor: '#737373',
        width: 150,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        backgroundColor: '#e5e5e5',
        width: '100%',
        height: 350,
        paddingBottom: 23,
    },
});