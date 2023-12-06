import {
    StyleSheet,
    View,
    Button,
} from "react-native";
import React, {useState} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import { useFocusEffect } from '@react-navigation/native';
import FavoritesDisplay from "./FavoritesDisplay";
import {clearStorage, getAllCocktails} from "../utils/asyncStorageCalls";

const value = {
    name: "Florentin Kocher",
    job: "Software Developer"
};

function SetupFavorites({ navigation }) {

    const [cocktailsData, setCocktailsData] = useState([]);

    const readItemsFromStorage = async () => {
        const items = await getAllCocktails();
        setCocktailsData(items);
    };

    useFocusEffect(
        React.useCallback(() => {
            console.log('useFocusEffect')
            readItemsFromStorage();

            return () => {
            };
        }, [])
    )

    return (
        <View style={styles.view}>
            <View style={styles.researchView}>
                <Button title={'Clear storage'} onPress={() => clearStorage()}/>
                <Button title={'Print all cocktails'} onPress={() => getAllCocktails()}/>
            </View>
            <FavoritesDisplay cocktailsData={cocktailsData}/>
        </View>
    );
}

const FavoritesStack = createNativeStackNavigator();

const Search = ({navigation}) => {

    return <>
        <SetupFavorites/>
    </>;
};

export default Search;

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
