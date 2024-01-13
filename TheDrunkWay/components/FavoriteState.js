import {MaterialIcons} from "@expo/vector-icons";
import React, {useEffect, useState} from "react";
import {updateFavoriteCocktail} from "../utils/asyncStorageCalls";
import {StyleSheet, View} from "react-native";
import {IconButton} from "react-native-paper";

export default function FavoriteState(props) {
    const cocktail = props.data;
    const [isLoading, setIsLoading] = useState(false);

    async function update() {
        await updateFavoriteCocktail(cocktail, !cocktail.isFavorite);
        cocktail.isFavorite = !cocktail.isFavorite;
        setIsLoading(!isLoading);
    }

    // function setIconName() {
    //     if (cocktail.isFavorite) {
    //         return 'favorite'
    //     } else {
    //         return 'favorite-outline'
    //     }
    // }

    function setIconNameHeart() {
        if (cocktail.isFavorite) {
            return 'heart'
        } else {
            return 'heart-outline'
        }
    }

    return (
        <View style={styles.btn}>
            <IconButton icon={setIconNameHeart()}
                        iconColor={'red'}
                        size={30}
                        onPress={() => update(!cocktail.isFavorite)}
            />
            {/*<MaterialIcons.Button name={setIconName()} style={styles.icon} size={30} color={'red'} onPress={() => update(!isFavorite)} />*/}
        </View>
    );
}

const styles = StyleSheet.create({
    btn: {
        alignItems: 'flex-end',
    },
});
