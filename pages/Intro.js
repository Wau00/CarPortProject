import React, { useEffect, useState, Component } from 'react';
import { View, StyleSheet, Animated, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { collection, doc, query, where, onSnapshot, getDocs } from 'firebase/firestore';
import { Text, Button, ButtonGroup } from '@rneui/themed';
import Login from './Login';


const MyComponent = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, []);

    return (
        <View style={{ padding: 20 }}>
            {isLoading ? (
                <ActivityIndicator size="large" color="#EA580C" />
            ) : (
                <Text>Content loaded!</Text>
            )}
        </View>
    );
};




class Intro extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            slideAnim: new Animated.Value(-100),
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                isLoading: false,
            });
        }, 3000);

        Animated.timing(
            this.state.slideAnim,
            {
                toValue: 0,
                duration: 550, // Set animation duration in milliseconds
                useNativeDriver: true, // Optimize performance for native platforms
            }
        ).start();
    }

    render() {

        if (this.state.isLoading) {

            return (
                <Animated.View style={[styles.signInScreen, { transform: [{ translateX: this.state.slideAnim }] }]}>
                    <Text style={styles.loadingScreenText}>Carport</Text>
                    <MyComponent />
                </Animated.View>
            );
        } else {
            return (
                <Login />
            );
        }
    }
}

const styles = StyleSheet.create({
    loadingScreen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    loadingScreenText: {
        fontSize: 44,
        fontWeight: 'bold',
        color: '#000000',
    },
    signInScreen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});

export default Intro;