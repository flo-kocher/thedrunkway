import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export default function LetterBtn({letter, handleClick}) {

    return (
        <TouchableOpacity style={styles.letterBtn} onPress={handleClick}>
            <Text style={styles.text}>{letter.toUpperCase()}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    text: {
        color: '#fafaff',
        fontSize: 15,
        fontWeight: 'bold'
    },
    letterBtn: {
        width: 40,
        height: 40,
        margin: 9,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: '#30343F',
        borderColor: '#1985A1',
        borderWidth: 6,
        elevation: 5, // Android
    },
});
