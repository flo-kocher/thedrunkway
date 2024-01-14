import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';


export default function RectangleBtn({searchBy, handleClick}) {
    // TODO: display les btn par 2 ou 3 par ligne sur l'écran
    //  -> peut être les mettres dans des Flat pour que ça soit plus simple

    return (
        <TouchableOpacity style={styles.button} onPress={handleClick}>
            <Text style={styles.text}>{searchBy}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    text: {
        color: '#fafaff',
        fontSize: 15,
        textAlign: 'center',
    },
    button: {
        width: 100,
        height: 60,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#30343F',
        borderColor: '#1985A1',
        borderWidth: 6,
        elevation: 5, // Android
    },
});
