import React from 'react';
import {StyleSheet, View, ImageBackground, Text, Button} from 'react-native';

export default function CocktailIngredientListItem({data}) {
    let ingredient = data[0];
    let measure = data[1];

    return (
        <View>
            <Text style={styles.text}>{ingredient} {measure}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
    },
});
