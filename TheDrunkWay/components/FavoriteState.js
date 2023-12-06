import {MaterialIcons} from "@expo/vector-icons";
import React, {useState} from "react";
import {updateFavoriteCocktail} from "../utils/asyncStorageCalls";
import {View} from "react-native";

export default function FavoriteState(props) {
    const [isFavorite, setIsFavorite] = useState(props.data.isFavorite);
    const cocktail = props.data;

    /*

    faire le design de l'affichage des trucs du cocktail
    regarder sur un internet des exemples pour cocktails
    ou manger
    comment ils affichent tout


     */

    async function update() {
        await updateFavoriteCocktail(cocktail, !isFavorite);
        setIsFavorite(!isFavorite);
    }

    function setIconName() {
        if (isFavorite) {
            return 'favorite'
        } else {
            return 'favorite-outline'
        }
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <MaterialIcons.Button name={setIconName()} size={30} color={'red'} onPress={() => update(!isFavorite)} />
        </View>
    );
}
