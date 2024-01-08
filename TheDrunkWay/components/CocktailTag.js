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
    },
    tag: {
        width: 100,
        height: 100,
        padding: 10,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: 'red'
    },
});
