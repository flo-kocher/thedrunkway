import {MaterialIcons} from "@expo/vector-icons";
import React, {useState} from "react";
import {updateFavoriteCocktail} from "../utils/asyncStorageCalls";
import {StyleSheet, View} from "react-native";
import {IconButton} from "react-native-paper";

export default function FavoriteState(props) {
    const [isFavorite, setIsFavorite] = useState(props.data.isFavorite);
    const cocktail = props.data;

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

    function setIconNameHeart() {
        if (isFavorite) {
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
                        onPress={() => update(!isFavorite)}
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
