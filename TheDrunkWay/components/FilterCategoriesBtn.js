import React from 'react';
import {StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native';

const windowDimensions = Dimensions.get('window');

export default function FilterCategoriesBtn({selected, searchBy, handleClick}) {


    return (
        <TouchableOpacity style={selected ? styles.selectedButton : styles.button} onPress={handleClick}>
            <Text style={selected ? styles.selectedText : styles.text}>{searchBy}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    text: {
        color: '#30343F',
        fontSize: 11,
        textAlign: 'center',
    },
    selectedText: {
        color: '#fafaff',
        fontSize: 11,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    button: {
        width: windowDimensions.width*23/100,
        height: windowDimensions.height*5/100,
        margin: windowDimensions.width*1/100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#fafaff',
        borderColor: '#30343F',
        borderWidth: 1,
        elevation: 5
    },
    selectedButton: {
        width: windowDimensions.width*23/100,
        height: windowDimensions.height*5/100,
        margin: windowDimensions.width*1/100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#30343F',
        borderColor: '#fafaff',
        borderWidth: 2,
        elevation: 10,
    },
});
