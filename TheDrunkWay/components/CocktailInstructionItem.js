import React from 'react';
import {StyleSheet, View, ImageBackground, Text, Button} from 'react-native';

export default function CocktailInstructionItem({index, data}) {

    if(data != null && data.trim() !== '')
        return (
            <View style={styles.view}>
                <Text style={styles.text}>
                    {index+1}.{'\t'}
                </Text>
                <Text style={styles.text2}>{data.trim()}</Text>
            </View>
        );
}

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        padding: 4,
    },
    text: {
        fontSize: 17,
    },
    text2: {
        paddingRight: 15,
        fontSize: 17
    }
});
