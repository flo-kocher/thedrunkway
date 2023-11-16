import React, { useState, useEffect } from "react";
import {StyleSheet, View, Text, TouchableOpacity, Button, FlatList} from 'react-native';
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import FavCocktailItem from "../components/FavCocktailItem"
import {getAllCocktails, getCocktail} from "../utils/asyncStorageCalls"

const DisplayFavorites = ({navigation}) => {

    const [value, setValue] = useState('');
    const [cocktailsData, setCocktailsData] = useState([]);
    const { getItem, setItem, mergeItem, removeItem } = useAsyncStorage('@storage_key');

    const readItemsFromStorage = async () => {
        const items = await getAllCocktails();
        setCocktailsData(items);
    };

    const writeItemToStorage = async newValue => {
        await setItem(newValue);
        setValue(newValue);
    };

    useEffect(() => {
        readItemsFromStorage();
    }, []);

    /*
    Faire un nouveau fichier et y mettre les mêmes éléments que dans
    https://react-native-async-storage.github.io/async-storage/docs/api
    à la fin, il faut que toutes les fonctions soient dans le même function MyComponent() { }
    donc virer cette fonction DisplayFavorites et la mettre dans un fichier à part
    et y rajouter toutes les fonctions d'écriture dans le AsyncStorage ...
     */

    return (
        <View style={{ margin: 40 }}>
            <Text>Current value: {value}</Text>
            <TouchableOpacity
                onPress={() =>
                    writeItemToStorage(
                        Math.random()
                            .toString(36)
                            .substr(2, 5)
                    )
                }
            >
                <Text>Update value</Text>
            </TouchableOpacity>
            <Text>Favorites display</Text>
            <FlatList data={cocktailsData} renderItem={({item}) => <FavCocktailItem data={item}/>}/>

        </View>
    );
}

export default DisplayFavorites;

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
