import React from 'react';
import {StyleSheet, View, ImageBackground, Text} from 'react-native';
import FavoriteState from "./FavoriteState";

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
        // height: '50%',
    },
    container: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 3,
        backgroundColor: '#C0C0C0',
        margin: 10,
        // width:'50vw',
        // height: '100vh',
    },
});

export default function CocktailListItem({cocktail}) {
    cocktail = cocktail.item;

    return (
        <View style={styles.container}>
            <View style={styles.cocktail}>
                <ImageBackground source={{uri: cocktail.strDrinkThumb}} style={[styles.photo, {flex: 1}]}>
                    <Text style={{color: '#fff', textAlign: 'center', fontSize: 15, fontWeight: 'bold'}}>{cocktail.strDrink}</Text>
                    <Text style={{color: '#fff', textAlign: 'center', fontSize: 15, fontWeight: 'bold'}}>{cocktail.idDrink}</Text>
                    <FavoriteState data={cocktail} />
                </ImageBackground>
            </View>
        </View>
    );
}
