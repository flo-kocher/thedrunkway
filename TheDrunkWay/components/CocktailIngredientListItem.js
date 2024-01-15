import React from 'react';
import {StyleSheet, View, ImageBackground, Text, Button} from 'react-native';

export default function CocktailIngredientListItem({data}) {
    let ingredient = data[0];
    let measure = data[1];

    return (
        <View style={styles.view}>
            <Text style={styles.ingredient}>{ingredient} : </Text>
            <Text style={styles.measure}>{measure}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
    },
    ingredient: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    measure: {
        fontSize: 17,
    }
});
