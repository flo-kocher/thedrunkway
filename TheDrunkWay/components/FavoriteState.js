import React, {useState} from "react";
import {updateFavoriteCocktail} from "../utils/asyncStorageCalls";
import {StyleSheet} from "react-native";
import {IconButton} from "react-native-paper";

export default function FavoriteState(props) {
    const cocktail = props.data;
    const [isLoading, setIsLoading] = useState(false);

    async function update() {
        await updateFavoriteCocktail(cocktail, !cocktail.isFavorite);
        cocktail.isFavorite = !cocktail.isFavorite;
        setIsLoading(!isLoading);
    }

    function setIconNameHeart() {
        if (cocktail.isFavorite) {
            return 'heart'
        } else {
            return 'heart-outline'
        }
    }

    return (
        <IconButton icon={setIconNameHeart()}
                    iconColor={'red'}
                    size={30}
                    onPress={() => update(!cocktail.isFavorite)}
                    style={styles.btn}
                
        />
    );
}

const styles = StyleSheet.create({
    btn: {
        alignSelf: 'flex-end',
        margin: 0,
    },
});
