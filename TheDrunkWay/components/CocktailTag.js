import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';


export default function CocktailTag({data}) {

    const buttonClick = () => {
        console.log('clicked on a tag');
    }

    return (
        <TouchableOpacity style={styles.tag}
        onPress={buttonClick}>
            <Text style={styles.text}>{data}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    text: {
        color: '#ffffff',
        fontSize: 10,
    },
    tag: {
        width: 120,
        height: 35,
        padding: 10,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: 'red'
    },
});
