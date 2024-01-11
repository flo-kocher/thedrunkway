import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';


export default function RectangleBtn({searchBy}) {
    // TODO: display les btn par 2 ou 3 par ligne sur l'écran
    //  -> peut être les mettres dans des Flat pour que ça soit plus simple

    const onRectangleBtnClick = () => {
        console.log('you clicked on a rectangle btn to search by : ' + searchBy);
    }

    return (
        <TouchableOpacity style={styles.tag}
                          onPress={onRectangleBtnClick}>
            <Text style={styles.text}>{searchBy}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    text: {
        color: '#ffffff',
        fontSize: 15,
        textAlign: 'center',
    },
    tag: {
        width: 100,
        height: 60,
        padding: 10,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'blue'
    },
});
