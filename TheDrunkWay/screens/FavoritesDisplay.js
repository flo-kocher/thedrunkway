import React, { useState, useEffect } from "react";
import {StyleSheet, View, Text, FlatList} from 'react-native';
import FavCocktailItem from "../components/FavCocktailItem"

/*

- ensuite plus tard faire un design commun pour les card des cocktails
- commencer à faire le design pour les instructions pour faire les cocktails
- pour ces instructions mettre un système de Stack pour passer du cocktail choisi
à la page de Home ou de Search avec un bouton retour en arrière






- faire le bouton like/unlike pour les Cocktails
ensuite voir ce que je fais je sais pas encore
peut être l'affiche individuel des cocktails avec la lecture du dict de l'API
-> voir si il y a pas dans l'API un moyen de récup QUE les instructions
askip peut être il y a






 */

const FavoritesDisplay = ({cocktailsData}) => {

    /*
    Faire un nouveau fichier et y mettre les mêmes éléments que dans
    https://react-native-async-storage.github.io/async-storage/docs/api
    à la fin, il faut que toutes les fonctions soient dans le même function MyComponent() { }
    donc virer cette fonction DisplayFavorites et la mettre dans un fichier à part
    et y rajouter toutes les fonctions d'écriture dans le AsyncStorage ...
     */

    return (
        <View style={{ margin: 40 }}>
            <Text>Favorites display</Text>
            <FlatList data={cocktailsData} renderItem={({item}) => <FavCocktailItem data={item}/>}/>

        </View>
    );
}

export default FavoritesDisplay;

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 3,
    },
    input: {
        borderWidth: 1,
        width: '100%',
        padding: 5
    },
    view: {
        margin: 5,
        flex: 1
    },
    button: {
        margin: 10,
        borderWidth: 1,
        borderRadius: 3,
    },
    containerBorder: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 3,
        backgroundColor: '#C0C0C0',
        margin: 10,
    },
    researchView: {
        marginBottom: 5
    },
    resultView: {
        // width: '100%',
        // height: "10px"
    }
});
