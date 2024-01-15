import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import CountryFlag from "react-native-country-flag";


export default function LanguageBtn({lgName, handleClick, isoCode}) {
    if (isoCode === 'en')
        isoCode = 'us'

    return (
        <TouchableOpacity style={styles.btn} onPress={handleClick}>
            <CountryFlag isoCode={isoCode} size={25} />
            <Text style={styles.text}>{lgName}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    text: {
        color: '#fafaff',
        fontSize: 15,
        textAlign: 'center',
    },
    btn: {
        width: 250,
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
