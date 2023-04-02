import React, { useEffect, useState } from 'react';
import { Tab, Text, TabView } from '@rneui/themed';
import { collection, doc, query, where, onSnapshot, getDocs } from 'firebase/firestore';
import { db, auth } from '../config/firebase';

export default function TabCars() {
    const [index, setIndex] = React.useState(0);
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

    function TabItem() {

        console.log(buttonTitles);
        <Tab.Item
            title={buttonTitles}
            titleStyle={{ fontSize: 12 }}
            icon={{ name: 'timer', type: 'ionicon', color: 'white' }}
        />

    }
    return (
        <>
            <Tab
                value={index}
                onChange={(e) => setIndex(e)}
                indicatorStyle={{
                    backgroundColor: 'white',
                    height: 3,
                }}
                variant="primary"
            >

                {buttonTitles.map((title, index) => (
                    <Tab.Item
                        key={index}
                        title={title}
                        titleStyle={{ fontSize: 12 }}
                    // icon={{ name: 'timer', type: 'ionicon', color: 'white' }}
                    />

                ))}
            </Tab>

            <TabView value={index} onChange={setIndex} animationType="spring">
                <TabView.Item style={{ backgroundColor: 'red', width: '100%' }}>
                    <Text h1>Recent</Text>
                </TabView.Item>
                <TabView.Item style={{ backgroundColor: 'blue', width: '100%' }}>
                    <Text h1>Favorite</Text>
                </TabView.Item>
                <TabView.Item style={{ backgroundColor: 'green', width: '100%' }}>
                    <Text h1>Cart</Text>
                </TabView.Item>
            </TabView>
        </>
    );
};