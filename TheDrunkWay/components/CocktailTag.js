import React from 'react';
import {StyleSheet, Text} from 'react-native';


export default function CocktailTag({data}) {

    return (
        <Text style={styles.tag}>{data}</Text>
    );
}

const styles = StyleSheet.create({
    tag: {
        width: 120,
        height: 35,
        padding: 10,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: '#1985A1',
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 10,
    }
});
