import React, {useState} from 'react';
import { StyleSheet, View, Image, ImageBackground, ActivityIndicator, Text } from 'react-native';

const styles = StyleSheet.create({
    photo: {
        resizeMode: 'cover',
        height: '100%',
        width: '100%',
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    cocktail: {
        borderRadius: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        borderColor: 'black', 
        borderWidth: 1, 
        borderRadius: 3, 
        backgroundColor: '#C0C0C0',
        margin: 10,
        width:'49vh',
        height: '20vh',
    },
});

export default function CocktailListItem({cocktail}) {   
    cocktail = cocktail.item;
    return (
        <View style={styles.container}>
            <View style={styles.cocktail}>
                <ImageBackground source={{uri: cocktail.strDrinkThumb}} style={[styles.photo, {flex: 1}]}>
                    <Text style={{color: '#fff', textAlign: 'center', fontSize: 15, fontWeight: 'bold'}}>{cocktail.strDrink}</Text>
                </ImageBackground>
            </View>
        </View>
    );
}