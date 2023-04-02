import React, { useState } from 'react'
import { Text, View, StyleSheet, Tab, TabView } from 'react-native';
import { Card, Button } from '@rneui/themed'
import PagerView from 'react-native-pager-view';

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
            <PagerView style={styles.pagerView} initialPage={0}>
                <View style={styles.tabView}>
                    <Text h4>{make}</Text>
                    <Text h4>{model}</Text>
                    <Text h4>{tagNumber}</Text>
                    <Text h4>{color}</Text>
                </View>
            </PagerView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pagerView: {
        flex: 1,
    },
    tabView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        flex: 3,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
});





