import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export default function LetterBtn({letter, handleClick}) {

    return (
        <TouchableOpacity style={styles.tag} onPress={handleClick}>
            <Text style={styles.text}>{letter.toUpperCase()}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    text: {
        color: '#ffffff',
        fontSize: 15,
    },
    tag: {
        width: 40,
        height: 40,
        padding: 10,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: 'blue'
    },
});
