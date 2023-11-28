import {MaterialIcons} from "@expo/vector-icons";
import React from "react";
import {updateFavoriteCocktail} from "../utils/asyncStorageCalls";

export default function FavoriteState(props) {

    /*
    ajouter là dedans un useState je pense
    avec une valeur genre state qui doit s'update en fonction de isFavorite
    essayer de faire ça pour que le coeur s'update en temps réel

     */


    const cocktail = props.data;
    let iconName = 'favorite';

    if (!cocktail.isFavorite) {
        iconName = 'favorite-outline'
    }

    return (
        <MaterialIcons.Button name={iconName} size={30} color={'red'} onPress={() => updateFavoriteCocktail(cocktail)} />
    );
}
