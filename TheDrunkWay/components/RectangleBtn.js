import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';


export default function RectangleBtn({searchBy, handleClick}) {

    return (
        <TouchableOpacity style={styles.btn} onPress={handleClick}>
            <Text style={styles.text}>{searchBy}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    text: {
        color: '#fafaff',
        fontSize: 14,
        textAlign: 'center',
    },
    btn: {
        width: 100,
        height: 60,
        margin: 10,
        padding: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#30343F',
        borderColor: '#1985A1',
        borderWidth: 4,
        elevation: 5, // Android
    },
});
